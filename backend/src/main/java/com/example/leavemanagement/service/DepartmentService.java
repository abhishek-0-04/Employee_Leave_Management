package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.DepartmentRequest;
import com.example.leavemanagement.dto.DepartmentResponse;
import com.example.leavemanagement.entity.Department;
import com.example.leavemanagement.exception.BusinessException;
import com.example.leavemanagement.exception.ResourceNotFoundException;
import com.example.leavemanagement.repository.DepartmentRepository;
import com.example.leavemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<DepartmentResponse> getAll() {
        return departmentRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public DepartmentResponse create(DepartmentRequest request) {
        String name = request.name().trim();
        if (departmentRepository.existsByNameIgnoreCase(name)) {
            throw new BusinessException("Department name already exists");
        }
        return toResponse(departmentRepository.save(new Department(name)));
    }

    @Transactional
    public DepartmentResponse update(Long id, DepartmentRequest request) {
        Department department = getEntity(id);
        String name = request.name().trim();
        departmentRepository.findByNameIgnoreCase(name).ifPresent(existing -> {
            if (!existing.getId().equals(id)) throw new BusinessException("Department name already exists");
        });
        department.setName(name);
        return toResponse(departmentRepository.save(department));
    }

    @Transactional
    public void delete(Long id) {
        getEntity(id);
        if (employeeRepository.existsByDepartmentId(id)) {
            throw new BusinessException("Cannot delete a department that has employees assigned to it");
        }
        departmentRepository.deleteById(id);
    }

    public Department getEntity(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found: " + id));
    }

    private DepartmentResponse toResponse(Department department) {
        return new DepartmentResponse(department.getId(), department.getName());
    }
}
