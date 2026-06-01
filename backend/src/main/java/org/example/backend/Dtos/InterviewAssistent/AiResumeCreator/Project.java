package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private String name;
    private String startDate;
    private String endDate;
    private String description;
    private String technologies;
}