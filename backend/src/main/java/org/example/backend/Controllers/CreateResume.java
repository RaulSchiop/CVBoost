package org.example.backend.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.Requests.CreateResumeRequest;
import org.example.backend.Requests.DeleteResumeRequest;
import org.example.backend.Response.CreateResumeResponse;
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

    private final ResumeService resumeService;

    @Autowired
    CreateResume(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/create")
    CreateResumeResponse createResume(@RequestBody CreateResumeRequest resume) {
        return resumeService.createResume(resume);
    }

    @PostMapping("/save")
    ResponseEntity<?> saveResume(@RequestParam("file") MultipartFile file,@RequestParam("email") String email) {
        return resumeService.save(email,file);
    }

    @PostMapping("/delete")
    ResponseEntity<?> deleteResume(@RequestBody DeleteResumeRequest request) {
        return resumeService.deleteResume(request.email(),request.fileName());
    }
}
