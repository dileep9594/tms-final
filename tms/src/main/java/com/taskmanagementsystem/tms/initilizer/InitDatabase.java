package com.taskmanagementsystem.tms.initilizer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.taskmanagementsystem.tms.model.User;
import com.taskmanagementsystem.tms.repository.UserRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class InitDatabase implements CommandLineRunner {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) {
        List<User> USERS = Arrays.asList(
                new User(1L, "admin", "admin@gmail.com", "1234567890", passwordEncoder.encode("admin"), null, "ADMIN", 0.0,new ArrayList<>()),
                new User(2L, "user", "user@gmail.com", "0987654321", passwordEncoder.encode("user"), null, "USER", 0.0,new ArrayList<>())
        );
        if (!repository.findAll().isEmpty()) {
            return;
        }
        repository.saveAll(USERS);
        log.info("Database initialized");
    }

}