package org.example.backend.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.Certification;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.Education;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator.GeneratedExperience;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator.GeneratedProject;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.GeneratedResumeCreator.GeneratedSkills;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateResumeResponse {


    private String name;
    private String email;
    private String phone;
    private String location;
    private String linkedin;
    private String github;
    private String website;
    private String summary;
    private GeneratedSkills skills;
    private List<GeneratedExperience> experience;
    private List<GeneratedProject> projects;
    private List<Education> education;
    private List<Certification> certifications;

    private List<String> languages;
}