package org.example.backend.Services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.Dtos.InterviewAssistent.AiResumeReview.AiResumeReviewResponse;
import org.example.backend.Models.Resume;
import org.example.backend.Requests.CreateResumeRequest;
import org.example.backend.Response.CreateResumeResponse;
import org.example.backend.Utils.AiAsistentPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Service
public class AiCreateResumeService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final DynamoDbTable<Resume> resumeTable;
    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public AiCreateResumeService(ChatClient.Builder builder, ObjectMapper objectMapper, DynamoDbEnhancedClient enhancedClient, S3Client s3Client) {
        this.chatClient = builder.build();
        this.s3Client = s3Client;
        this.objectMapper = objectMapper;
        this.resumeTable = enhancedClient.table("AppTable", TableSchema.fromBean(Resume.class));
    }

    public CreateResumeResponse createResume(CreateResumeRequest request) {

        var converter = new BeanOutputConverter<>(CreateResumeResponse.class);

        return chatClient.prompt()
                .system(AiAsistentPrompt.CREATE_RESUME_SYSTEM_PROMPT)
                .user(u-> {
                    try {
                        u.text(AiAsistentPrompt.CREATE_RESUME_PROMPT)
                                .param("target_role",request.getTargetRole() != null
                                        ? request.getTargetRole()
                                        : "not specified")
                                .param("company", request.getTargetCompany() != null
                                        ? request.getTargetCompany()
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


}
