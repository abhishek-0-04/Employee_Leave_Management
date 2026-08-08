package com.example.leavemanagement.controller;

import com.example.leavemanagement.dto.DepartmentRequest;
import com.example.leavemanagement.dto.DepartmentResponse;
import com.example.leavemanagement.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) { this.departmentService = departmentService; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DepartmentResponse create(@Valid @RequestBody DepartmentRequest request) { return departmentService.create(request); }

    @GetMapping
    public List<DepartmentResponse> getAll() { return departmentService.getAll(); }

    @PutMapping("/{id}")
    public DepartmentResponse update(@PathVariable Long id, @Valid @RequestBody DepartmentRequest request) {
        return departmentService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { departmentService.delete(id); }
}
