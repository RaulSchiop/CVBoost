package org.example.backend.Dtos.InterviewAssistent.AiResumeReview;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quantified {
    private int score;
    private String label;
    private String careerStage;
    private List<String> examplesFound;
    private List<String> suggestions;
    private String feedback;
}
