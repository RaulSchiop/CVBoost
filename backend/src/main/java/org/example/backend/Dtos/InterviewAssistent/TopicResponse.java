package org.example.backend.Dtos.InterviewAssistent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicResponse {
    private String role;
    private String seniority;
    private List<Topic> topics;
}