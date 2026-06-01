package org.example.backend.Requests;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateResumeRequest {
    private String name;
    private String email;
    private String phone;
    private String location;

    private String linkedin;
    private String github;
    private String website;

    private String targetRole;
    private String targetCompany;

    private String summary;
    private Skills skills;
    private List<Experience> experience;
    private List<Project> projects;
    private List<Education> education;
    private List<Certification> certifications;
    private List<String> languages;
}
