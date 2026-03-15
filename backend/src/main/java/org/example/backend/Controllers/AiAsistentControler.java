package org.example.backend.Controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.example.backend.Dtos.InterviewAssistent.QuestionResponse;
import org.example.backend.Dtos.InterviewAssistent.TopicResponse;
import org.example.backend.Requests.QuestionRequest;
import org.example.backend.Requests.TopicsRequest;
import org.example.backend.Services.AiAsistentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/AiAsistent")
public class AiAsistentControler {


    private final AiAsistentService aiAsistentService;

    @Autowired
    public AiAsistentControler(AiAsistentService aiAsistentService) {
        this.aiAsistentService = aiAsistentService;
    }


    @Operation(
            summary = "Get learning topics from AI",
            description = "Analyzes seniority level and job description to provide 4 critical learning topics via AI."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Topics generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TopicResponse.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request (e.g., missing job description)",
                    content = @Content),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal AI error or processing timeout",
                    content = @Content)
    })
    @PostMapping("/topics")
    public ResponseEntity<?> getTopics(@RequestBody TopicsRequest request) {
        try {

            TopicResponse returnData = aiAsistentService.getTopics(request);

            return ResponseEntity.ok(returnData);

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "Couldn't get topic list. try again later.",
                    "details", e.getMessage()
            ));
        }
    }


    @Operation(
            summary = "Get questions based on a specific topic",
            description = "Generates 10 interview-style questions based on the selected topic and candidate seniority level."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Questions generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = QuestionResponse.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request (e.g., missing topic or seniority)",
                    content = @Content),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal AI error or processing timeout",
                    content = @Content)
    })
    @PostMapping("/questions")
    public ResponseEntity<?> getQuestions(@RequestBody QuestionRequest request) {


        try {

            QuestionResponse returnData = aiAsistentService.getQuestionsBasedOnTopic(request);

            return ResponseEntity.ok(returnData);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "Couldn't get question list. try again later.",
                    "details", e.getMessage()
            ));
        }


    }


}
