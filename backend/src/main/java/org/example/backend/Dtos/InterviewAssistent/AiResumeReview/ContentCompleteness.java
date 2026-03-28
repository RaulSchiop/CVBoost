package org.example.backend.Dtos.InterviewAssistent.AiResumeReview;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentCompleteness {
    private int score;
    private String label;
    private List<String> presentSections;
    private List<String> missingSections;
    private String feedback;
}
