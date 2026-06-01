package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    private String company;
    private String role;
    private String startDate;
    private String endDate;
    private String description;
}