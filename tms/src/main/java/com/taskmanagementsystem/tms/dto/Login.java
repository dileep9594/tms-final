package com.taskmanagementsystem.tms.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Login {
    @NotEmpty(message = "Invalid: email cannot be empty.")
    private String email;
    @NotEmpty(message = "Invalid: password cannot be empty")
    private String password ;
}
