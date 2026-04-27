package org.example.backend.Controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.Dtos.InterviewAssistent.AiResumeReview.AiResumeReviewResponse;
import org.example.backend.Dtos.InterviewAssistent.TopicResponse;
import org.example.backend.Services.AiResumeReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/AiResume")
@CrossOrigin(origins = "http://localhost:3000")
public class AiResumeReview {

    private final AiResumeReviewService aiResumeReviewService;

    @Autowired
    AiResumeReview(AiResumeReviewService aiResumeReviewService) {
        this.aiResumeReviewService = aiResumeReviewService;
    }

    @Operation(
            summary = "Get Ai resume review score",
            description = "Analyze the resume and give score based on ssome criteria"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Score generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AiResumeReviewResponse.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request (e.g., missing file)",
                    content = @Content),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal AI error or processing timeout",
                    content = @Content)
    })

    @PostMapping("/review")
    public ResponseEntity<?> getScoreReview(@RequestParam("file") MultipartFile file) throws IOException {

        try {
            log.info("Get analysis request: {}", file.getName());
            String aiResponse = aiResumeReviewService.getTextReview(file);
            log.info("Get the response from AI: {}" ,aiResponse);

            return ResponseEntity.ok(aiResponse);
        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "Couldn't get Resume analysis. try again later.",
                    "details", e.getMessage()
            ));
        }
    }

}
