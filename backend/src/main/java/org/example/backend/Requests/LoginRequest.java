package org.example.backend.Requests;

public record LoginRequest(
        String email,
        String password
) {}