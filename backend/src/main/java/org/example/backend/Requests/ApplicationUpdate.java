package org.example.backend.Requests;

public record ApplicationUpdate(
        String email,
        String sk,
        String status
) {}