package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedProject {
    private String name;
    private String startDate;
    private String endDate;
    private List<String> bullets;
    private List<String> technologies;
}