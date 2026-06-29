package org.example.backend.Services;

import org.example.backend.Dtos.InterviewAssistent.AiResumeReview.AiResumeReviewResponse;
import org.example.backend.Models.Resume;
import org.example.backend.Requests.UpdateScoreRequest;
import org.example.backend.Utils.AiAsistentPrompt;
import org.example.backend.Utils.FileUtils;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.UpdateItemEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import java.io.IOException;

@Service
public class AiResumeReviewService
{

    private final ChatClient chatClient;
    private final DynamoDbTable<Resume> resumeTable;
    public AiResumeReviewService(ChatClient.Builder builder, DynamoDbEnhancedClient enhancedClient) {
        chatClient = builder.build();
        this.resumeTable = enhancedClient.table("AppTable", TableSchema.fromBean(Resume.class));

    }

    public String getTextReview(MultipartFile file) throws IOException {

        var converter = new BeanOutputConverter<>(AiResumeReviewResponse.class);

        String fileText = FileUtils.extractPdfToText(file);
        return chatClient.prompt()
                .system(AiAsistentPrompt.SYSTEM_PROMPT_AI_REVIEW)
                .user(u->u.text(AiAsistentPrompt.Ai_RESUME_REVIEW_GENERATOR_PROMPT)
                        .param("resume_text",fileText)
                        .param("format", converter.getFormat())
                )
                .call()
                .content();


    }


    public ResponseEntity<?> updateScore(UpdateScoreRequest request) {
        try {
            Resume resumeUpdates = new Resume();
            resumeUpdates.setPK(request.email());
            resumeUpdates.setSK("RESUME#" + request.fileName());
            resumeUpdates.setAtsScore(request.atsScore());

            Expression onlyIfExistsCondition = Expression.builder()
                    .expression("attribute_exists(PK) AND attribute_exists(SK)")
                    .build();

            UpdateItemEnhancedRequest<Resume> updateRequest = UpdateItemEnhancedRequest.builder(Resume.class)
                    .item(resumeUpdates)
                    .conditionExpression(onlyIfExistsCondition)
                    .ignoreNulls(true)
                    .build();

            resumeTable.updateItem(updateRequest);

            return ResponseEntity.status(HttpStatus.OK).body("Score updated successfully");

        } catch (software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException e) {
            return new ResponseEntity<>("Resume does not exist. Cannot update score.", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update score: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
