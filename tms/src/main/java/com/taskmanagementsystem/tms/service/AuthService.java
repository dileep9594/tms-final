package com.taskmanagementsystem.tms.service ;



import java.util.Optional;

import com.taskmanagementsystem.tms.dto.Login;
import com.taskmanagementsystem.tms.model.User;
import com.taskmanagementsystem.tms.security.AuthResponse;

public interface AuthService {
    AuthResponse register(User register,String role);
    Optional<User> login(Login login);
}
