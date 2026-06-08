package org.example.backend.Services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.Models.Resume;
import org.example.backend.Requests.CreateResumeRequest;
import org.example.backend.Response.CreateResumeResponse;
import org.example.backend.Response.GetResumesResponse;
import org.example.backend.Utils.AiAsistentPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ResumeService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final DynamoDbTable<Resume> resumeTable;
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public ResumeService(ChatClient.Builder builder, ObjectMapper objectMapper, DynamoDbEnhancedClient enhancedClient, S3Client s3Client, S3Presigner s3Presigner) {
        this.chatClient = builder.build();
        this.s3Client = s3Client;
        this.objectMapper = objectMapper;
        this.s3Presigner = s3Presigner;
        this.resumeTable = enhancedClient.table("AppTable", TableSchema.fromBean(Resume.class));
    }

    public CreateResumeResponse createResume(CreateResumeRequest request) {

        var converter = new BeanOutputConverter<>(CreateResumeResponse.class);

        return chatClient.prompt()
                .system(AiAsistentPrompt.CREATE_RESUME_SYSTEM_PROMPT)
                .user(u-> {
                    try {
                        u.text(AiAsistentPrompt.CREATE_RESUME_PROMPT)
                                .param("target_role",request.targetRole() != null
                                        ? request.targetRole()
                                        : "not specified")
                                .param("company", request.targetCompany() != null
                                        ? request.targetCompany()
                                        : "not specified")
                                .param("data", objectMapper.writeValueAsString(request))
                                .param("format", converter.getFormat());
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }).call()
                .entity(CreateResumeResponse.class);
    }

    public ResponseEntity<?> save(String email, MultipartFile filePayload) {
        try {
            String originalFileName = filePayload.getOriginalFilename();

            if (originalFileName == null || originalFileName.isEmpty()) {
                return new ResponseEntity<>("Invalid file name.", HttpStatus.BAD_REQUEST);
            }

            String s3Key = "resumes/" + email + "/" + originalFileName;


            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType("application/pdf")
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(filePayload.getInputStream(), filePayload.getSize()));

            Resume resume = new Resume();
            resume.setPK(email);
            resume.setSK("RESUME#" + originalFileName);
            resume.setFileName(originalFileName);
            resume.setFile(s3Key);
            resume.setUploadedAt(Instant.now().toString());

            resumeTable.putItem(resume);

            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<?> getResumesByEmail(String email) {
        try {
            QueryConditional queryConditional = QueryConditional
                    .sortBeginsWith(Key.builder()
                            .partitionValue(email)
                            .sortValue("RESUME#")
                            .build());

            List<GetResumesResponse> userResumes = resumeTable.query(queryConditional)
                    .items()
                    .stream()
                    .map(resume -> {
                        String s3Key = resume.getFile();

                        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                                .bucket(bucketName)
                                .key(s3Key)
                                .build();

                        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                                .signatureDuration(Duration.ofMinutes(15))
                                .getObjectRequest(getObjectRequest)
                                .build();

                        String securePresignedUrl = s3Presigner.presignGetObject(presignRequest).url().toString();

                        GetResumesResponse item = new GetResumesResponse();
                        item.setFileName(resume.getFileName());
                        item.setUploadedAt(resume.getUploadedAt());
                        item.setAtsScore(resume.getAtsScore());
                        item.setDownloadUrl(securePresignedUrl);
                        return item;
                    })
                    .toList();

            return new ResponseEntity<>(userResumes, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
