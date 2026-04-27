package org.example.backend.Controllers;


import org.example.backend.Requests.UserRequest;

import org.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



}
