package org.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Dtos.InterviewAssistent.Topic;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicResponse {
    private String role;
    private String seniority;
    private List<Topic> topics;
}