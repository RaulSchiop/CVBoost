package org.example.backend.Services;
import org.example.backend.Models.CoverLetter;
import org.example.backend.Requests.CreateCoverLetter;
import org.example.backend.Utils.AiAsistentPrompt;
import org.example.backend.Utils.FileUtils;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CoverLetterService {

    private final ChatClient chatClient;


    public CoverLetterService(ChatClient.Builder builder) {
        this.chatClient = builder.build();

    }


    public String createCoverLetter(CreateCoverLetter request, MultipartFile file) throws IOException {
        String fileText = FileUtils.extractPdfToText(file);
        var converter = new BeanOutputConverter<>(CoverLetter.class);

        return chatClient.prompt()
                .user(u -> u.text(AiAsistentPrompt.CREATE_COVER_LETTER_PROMPT)
                        .param("name", request.name())
                        .param("company", request.company())
                        .param("jobTitle", request.jobTitle())
                        .param("description", request.jobDescription() != null ? request.jobDescription() : "Not provided")
                        .param("data", fileText))
                .call()
                .content();
    }

}
