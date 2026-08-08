package com.example.leavemanagement.dto;

import com.example.leavemanagement.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeRequest(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Email is required") @Email(message = "Enter a valid email") String email,
        String password,
        @NotNull(message = "Department is required") Long departmentId,
        Role role
) {}
