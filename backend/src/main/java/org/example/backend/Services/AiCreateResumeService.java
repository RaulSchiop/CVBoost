package org.example.backend.Services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.Dtos.InterviewAssistent.AiResumeReview.AiResumeReviewResponse;
import org.example.backend.Requests.CreateResumeRequest;
import org.example.backend.Response.CreateResumeResponse;
import org.example.backend.Utils.AiAsistentPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AiCreateResumeService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AiCreateResumeService(ChatClient.Builder builder, ObjectMapper objectMapper) {
        chatClient = builder.build();
        this.objectMapper = objectMapper;
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


}
