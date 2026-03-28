package org.example.backend.Dtos.InterviewAssistent.AiResumeReview;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiResumeReviewResponse {

    private int ats_score;
    private String grade;
    private String summary;
    private Criteria criteria;
    private List<String> topImprovements;
    private List<String> strengths;



}
