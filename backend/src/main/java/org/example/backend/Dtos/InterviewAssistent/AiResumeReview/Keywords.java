package org.example.backend.Dtos.InterviewAssistent.AiResumeReview;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Keywords {
    private int score;
    private String label;
    private List<String> strongKeywords;
    private List<String> weakAreas;
    private String feedback;



}
