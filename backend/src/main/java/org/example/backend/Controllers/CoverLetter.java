package org.example.backend.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.Requests.CreateCoverLetter;
import org.example.backend.Services.CoverLetterService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/v1/createCoverLetter")
@CrossOrigin(origins = "http://localhost:3000")
public class CoverLetter {

    private final CoverLetterService coverLetterService;

    public CoverLetter(CoverLetterService coverLetterService) {
        this.coverLetterService = coverLetterService;
    }
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCoverLetter(
            @RequestPart("data") CreateCoverLetter request,
            @RequestPart("file") MultipartFile file) throws IOException {
        try {
            String result = coverLetterService.createCoverLetter(request, file);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
