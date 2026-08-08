package com.example.leavemanagement.controller;

import com.example.leavemanagement.dto.LeaveRequestDto;
import com.example.leavemanagement.dto.LeaveResponse;
import com.example.leavemanagement.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {
    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) { this.leaveService = leaveService; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeaveResponse create(@Valid @RequestBody LeaveRequestDto request) { return leaveService.create(request); }

    @GetMapping
    public List<LeaveResponse> getAll() { return leaveService.getAll(); }

    @GetMapping("/{id}")
    public LeaveResponse getById(@PathVariable Long id) { return leaveService.getById(id); }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveResponse> getByEmployee(@PathVariable Long employeeId) { return leaveService.getByEmployee(employeeId); }

    @PutMapping("/{id}")
    public LeaveResponse update(@PathVariable Long id, @Valid @RequestBody LeaveRequestDto request) {
        return leaveService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public LeaveResponse cancel(@PathVariable Long id) { return leaveService.cancel(id); }

    @PutMapping("/{id}/approve")
    public LeaveResponse approve(@PathVariable Long id) { return leaveService.approve(id); }

    @PutMapping("/{id}/reject")
    public LeaveResponse reject(@PathVariable Long id) { return leaveService.reject(id); }
}
