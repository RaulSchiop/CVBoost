package org.example.backend.Requests;

import org.springframework.web.multipart.MultipartFile;

public record UpdateAtsRequest(String email, String fileName, int atsScore) {
}
