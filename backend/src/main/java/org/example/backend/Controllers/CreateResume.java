package org.example.backend.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.Models.Resume;
import org.example.backend.Requests.CreateResumeRequest;
import org.example.backend.Response.CreateResumeResponse;
import org.example.backend.Services.AiCreateResumeService;
import org.example.backend.Services.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api/v1/createResume")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateResume {

    private final AiCreateResumeService aiCreateResumeService;

    @Autowired
    CreateResume(AiCreateResumeService aiCreateResumeService) {
        this.aiCreateResumeService = aiCreateResumeService;
    }

    @PostMapping("/create")
    CreateResumeResponse createResume(@RequestBody CreateResumeRequest resume) {
        return aiCreateResumeService.createResume(resume);
    }

    @PostMapping("/save")
    ResponseEntity<?> saveResume(@RequestParam("file") MultipartFile file,@RequestParam("email") String email) {
        return aiCreateResumeService.save(email,file);
    }

}
