package com.example.leavemanagement.dto;

import com.example.leavemanagement.entity.Role;

public record LoginResponse(Long id, String name, String email, Long departmentId, String departmentName, Role role) {}
