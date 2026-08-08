package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.LoginRequest;
import com.example.leavemanagement.dto.LoginResponse;
import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.exception.BusinessException;
import com.example.leavemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final PasswordService passwordService;

    public AuthService(EmployeeRepository employeeRepository, PasswordService passwordService) {
        this.employeeRepository = employeeRepository;
        this.passwordService = passwordService;
    }

    public LoginResponse login(LoginRequest request) {
        Employee employee = employeeRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new BusinessException("Invalid email or password"));
        if (!passwordService.matches(request.password(), employee.getPassword())) {
            throw new BusinessException("Invalid email or password");
        }
        return new LoginResponse(employee.getId(), employee.getName(), employee.getEmail(),
                employee.getDepartment().getId(), employee.getDepartment().getName(), employee.getRole());
    }
}
