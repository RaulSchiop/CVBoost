package org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedSkills {
    private List<String> languages;
    private List<String> databases;
    private List<String> frameworks;
    private List<String> tools;
    private List<String> other;
}