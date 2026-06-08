package org.example.backend.Requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.example.backend.Dtos.InterviewAssistent.AiResumeCreator.*;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CreateResumeRequest(
        String name,
        String email,
        String phone,
        String location,
        String linkedin,
        String github,
        String website,
        String targetRole,
        String targetCompany,
        String summary,
        Skills skills,
        List<Experience> experience,
        List<Project> projects,
        List<Education> education,
        List<Certification> certifications,
        List<String> languages
) {}