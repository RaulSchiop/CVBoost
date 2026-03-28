package org.example.backend.Dtos.InterviewAssistent.AiResumeReview;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Criteria {
    private Formatting formatting;
    private ContentCompleteness contentCompleteness;
    private Quantified impactAchievements;
    private Keywords keywordDensity;
    private WritingQuality writingQuality;

}
