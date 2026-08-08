package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.EmployeeRequest;
import com.example.leavemanagement.dto.EmployeeResponse;
import com.example.leavemanagement.entity.Department;
import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.entity.Role;
import com.example.leavemanagement.exception.BusinessException;
import com.example.leavemanagement.exception.ResourceNotFoundException;
import com.example.leavemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentService departmentService;
    private final PasswordService passwordService;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentService departmentService, PasswordService passwordService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
        this.passwordService = passwordService;
    }

    @Transactional
    public EmployeeResponse create(EmployeeRequest request, boolean registration) {
        String email = request.email().trim().toLowerCase();
        if (employeeRepository.existsByEmailIgnoreCase(email)) {
            throw new BusinessException("Email is already registered");
        }
        if (request.password() == null || request.password().isBlank()) {
            throw new BusinessException("Password is required");
        }
        Employee employee = new Employee();
        employee.setName(request.name().trim());
        employee.setEmail(email);
        employee.setPassword(passwordService.hash(request.password()));
        employee.setDepartment(departmentService.getEntity(request.departmentId()));
        employee.setRole(registration ? Role.EMPLOYEE : (request.role() == null ? Role.EMPLOYEE : request.role()));
        return toResponse(employeeRepository.save(employee));
    }

    public List<EmployeeResponse> getAll() {
        return employeeRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Employee getEntity(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + id));
    }

    public EmployeeResponse getById(Long id) { return toResponse(getEntity(id)); }

    @Transactional
    public EmployeeResponse update(Long id, EmployeeRequest request) {
        Employee employee = getEntity(id);
        String email = request.email().trim().toLowerCase();
        employeeRepository.findByEmailIgnoreCase(email).ifPresent(existing -> {
            if (!existing.getId().equals(id)) throw new BusinessException("Email is already registered");
        });
        employee.setName(request.name().trim());
        employee.setEmail(email);
        employee.setDepartment(departmentService.getEntity(request.departmentId()));
        if (request.password() != null && !request.password().isBlank()) {
            employee.setPassword(passwordService.hash(request.password()));
        }
        if (request.role() != null) employee.setRole(request.role());
        return toResponse(employeeRepository.save(employee));
    }

    @Transactional
    public void delete(Long id) {
        employeeRepository.delete(getEntity(id));
    }

    private EmployeeResponse toResponse(Employee employee) {
        Department department = employee.getDepartment();
        return new EmployeeResponse(employee.getId(), employee.getName(), employee.getEmail(),
                department.getId(), department.getName(), employee.getRole());
    }
}
