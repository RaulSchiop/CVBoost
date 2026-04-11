package org.example.backend.Services;

import org.example.backend.Dtos.InterviewAssistent.AiResumeReview.AiResumeReviewResponse;
import org.example.backend.Dtos.InterviewAssistent.TopicResponse;
import org.example.backend.Utils.AiAsistentPrompt;
import org.example.backend.Utils.FileUtils;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AiResumeReviewService
{

    private final ChatClient chatClient;

    public AiResumeReviewService(ChatClient.Builder builder) {
        chatClient = builder.build();
    }

    public AiResumeReviewResponse getTextReview(MultipartFile file) throws IOException {

        var converter = new BeanOutputConverter<>(AiResumeReviewResponse.class);

        String fileText = FileUtils.extractPdfToText(file);
        return chatClient.prompt()
                .system(AiAsistentPrompt.SYSTEM_PROMPT_AI_REVIEW)
                .user(u->u.text(AiAsistentPrompt.Ai_RESUME_REVIEW_GENERATOR_PROMPT)
                        .param("resume_text",fileText)
                        .param("format", converter.getFormat())
                )
                .call()
                .entity(AiResumeReviewResponse.class);

    }


}
