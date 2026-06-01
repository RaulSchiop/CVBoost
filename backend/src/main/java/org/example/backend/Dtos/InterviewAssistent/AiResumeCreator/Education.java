package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    private String university;
    private String degree;
    private String major;
    private String startDate;
    private String endDate;
}
