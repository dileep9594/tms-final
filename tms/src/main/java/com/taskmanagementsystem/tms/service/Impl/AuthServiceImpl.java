package com.taskmanagementsystem.tms.service.Impl;


import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskmanagementsystem.tms.dto.Login;
import com.taskmanagementsystem.tms.exception.ApiException;
import com.taskmanagementsystem.tms.model.User;
import com.taskmanagementsystem.tms.repository.UserRepository;
import com.taskmanagementsystem.tms.security.AuthResponse;
import com.taskmanagementsystem.tms.service.AuthService;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;
@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse register(User register,String role) {
        if (userRepository.existsByEmail(register.getEmail())) throw new ApiException(HttpStatus.BAD_REQUEST, "Email has been already used.");
        if (userRepository.existsByUsername(register.getUsername())) throw new ApiException(HttpStatus.BAD_REQUEST, "Username already taken.");
        User user = buildUser(register,role);
        User savedUser = userRepository.save(user);

        return new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole());
    }

    @Override
    public Optional<User> login(Login login) {
        return userRepository.findByUsernameOrEmail(login.getUsername(), login.getUsername())
                .filter(user -> passwordEncoder.matches(login.getPassword(), user.getPassword()));
    }

    private User buildUser(User register,String role){
        User user = new User();
        user.setEmail(register.getEmail());
        user.setUsername(register.getUsername());
        user.setPassword(passwordEncoder.encode(register.getPassword()));
        user.setPhone(register.getPhone());
        user.setProfilePicture(register.getProfilePicture());
        user.setScore(register.getScore());
        user.setRole(role);
        return user;
    }
}