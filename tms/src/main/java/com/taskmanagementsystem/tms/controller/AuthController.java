package com.taskmanagementsystem.tms.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanagementsystem.tms.dto.Login;
import com.taskmanagementsystem.tms.model.User;
import com.taskmanagementsystem.tms.security.AuthResponse;
import com.taskmanagementsystem.tms.service.AuthService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    // User Authentication ----> Registration and Login
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody User register,@RequestParam String role){
        return ResponseEntity.ok(authService.register(register,role));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody Login login){
        Optional<User> user = authService.login(login);
        if (user.isPresent()){
            User presentUser = user.get();
            return ResponseEntity.ok(new AuthResponse(presentUser.getId(), presentUser.getUsername(), presentUser.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}