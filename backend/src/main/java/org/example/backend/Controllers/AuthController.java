package org.example.backend.Controllers;


import lombok.extern.slf4j.Slf4j;
import org.example.backend.Requests.UserRequest;
import org.example.backend.Requests.LoginRequest;

import org.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/createAccount")
    public ResponseEntity<?> createAccount(@RequestBody UserRequest user) {

        return userService.createUser(user);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        log.info("AuthController.login(): Received login request for email: {}", loginRequest.email());
        
        if (loginRequest.email() == null || loginRequest.password() == null) {
            log.info("AuthController.login(): Email or password is null");
            return ResponseEntity.badRequest().body("Email and password are required");
        }
        return userService.authenticateUser(loginRequest.email(), loginRequest.password());
    }
}
