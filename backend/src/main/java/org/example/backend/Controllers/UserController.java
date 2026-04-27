package org.example.backend.Controllers;


import org.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/getUserByEmail")
    ResponseEntity<?> getUserByEmail(@RequestBody String email) {

        return  userService.getUserByEmail(email);

    }

}
