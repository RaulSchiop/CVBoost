package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public  class GeneratedExperience {
    private String company;
    private String role;
    private String startDate;
    private String endDate;
    private List<String> bullets;
}
