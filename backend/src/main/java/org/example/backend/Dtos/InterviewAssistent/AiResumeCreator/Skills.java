package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skills {
    private String languages;
    private String databases;
    private String frameworks;
    private String tools;
    private String other;
}
