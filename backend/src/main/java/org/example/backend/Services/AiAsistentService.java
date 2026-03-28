package org.example.backend.Services;

import org.example.backend.Dtos.InterviewAssistent.QuestionResponse;
import org.example.backend.Dtos.InterviewAssistent.TopicResponse;
import org.example.backend.Requests.QuestionRequest;
import org.example.backend.Requests.TopicsRequest;
import org.example.backend.Utils.AiAsistentPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AiAsistentService {


    private final ChatClient chatClient;

    @Autowired
    public AiAsistentService(ChatClient.Builder builder) {
        chatClient = builder.build();
    }

    public TopicResponse getTopics(TopicsRequest request) {


        var converter = new BeanOutputConverter<>(TopicResponse.class);

        return chatClient.prompt()
                .system(AiAsistentPrompt.SYSTEM_PROMPT_TOPIC)
                .user(u -> u.text(AiAsistentPrompt.TOPIC_GENERATOR_PROMPT)
                        .param("seniority", request.seniority())
                        .param("jobTitle",request.jobTitle())
                        .param("description", request.description())
                        .param("format", converter.getFormat()))
                .call()
                .entity(converter);

    }


    public QuestionResponse getQuestionsBasedOnTopic(QuestionRequest request) {

        var converter = new BeanOutputConverter<>(QuestionResponse.class);

        return chatClient.prompt()
                .system(AiAsistentPrompt.SYSTEM_PROMPT_QUESTION)
                .user(u -> u.text(AiAsistentPrompt.QUESTION_GENERATOR_PROMPT)
                        .param("topic", request.topic())
                        .param("seniority", request.seniority())
                        .param("format", converter.getFormat()))
                .call()
                .entity(converter);


    }


}
