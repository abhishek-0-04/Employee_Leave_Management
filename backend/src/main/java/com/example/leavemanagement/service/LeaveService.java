package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.LeaveRequestDto;
import com.example.leavemanagement.dto.LeaveResponse;
import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.entity.LeaveRequest;
import com.example.leavemanagement.entity.LeaveStatus;
import com.example.leavemanagement.exception.BusinessException;
import com.example.leavemanagement.exception.ResourceNotFoundException;
import com.example.leavemanagement.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveService {
    private final LeaveRequestRepository leaveRepository;
    private final EmployeeService employeeService;

    public LeaveService(LeaveRequestRepository leaveRepository, EmployeeService employeeService) {
        this.leaveRepository = leaveRepository;
        this.employeeService = employeeService;
    }

    @Transactional
    public LeaveResponse create(LeaveRequestDto request) {
        validateDates(request.startDate(), request.endDate());
        Employee employee = employeeService.getEntity(request.employeeId());
        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(employee);
        leave.setLeaveType(request.leaveType());
        leave.setStartDate(request.startDate());
        leave.setEndDate(request.endDate());
        leave.setReason(request.reason().trim());
        leave.setStatus(LeaveStatus.PENDING);
        return toResponse(leaveRepository.save(leave));
    }

    public List<LeaveResponse> getAll() {
        return leaveRepository.findAllByOrderByStartDateDesc().stream().map(this::toResponse).toList();
    }

    public LeaveResponse getById(Long id) { return toResponse(getEntity(id)); }

    public List<LeaveResponse> getByEmployee(Long employeeId) {
        employeeService.getEntity(employeeId);
        return leaveRepository.findByEmployeeIdOrderByStartDateDesc(employeeId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public LeaveResponse update(Long id, LeaveRequestDto request) {
        validateDates(request.startDate(), request.endDate());
        LeaveRequest leave = getEntity(id);
        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new BusinessException("Only pending leave requests can be updated");
        }
        Employee employee = employeeService.getEntity(request.employeeId());
        leave.setEmployee(employee);
        leave.setLeaveType(request.leaveType());
        leave.setStartDate(request.startDate());
        leave.setEndDate(request.endDate());
        leave.setReason(request.reason().trim());
        return toResponse(leaveRepository.save(leave));
    }

    @Transactional
    public LeaveResponse cancel(Long id) {
        LeaveRequest leave = getEntity(id);
        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new BusinessException("Only pending leave requests can be cancelled");
        }
        leave.setStatus(LeaveStatus.CANCELLED);
        return toResponse(leaveRepository.save(leave));
    }

    @Transactional
    public LeaveResponse approve(Long id) {
        LeaveRequest leave = getEntity(id);
        ensurePending(leave);
        leave.setStatus(LeaveStatus.APPROVED);
        return toResponse(leaveRepository.save(leave));
    }

    @Transactional
    public LeaveResponse reject(Long id) {
        LeaveRequest leave = getEntity(id);
        ensurePending(leave);
        leave.setStatus(LeaveStatus.REJECTED);
        return toResponse(leaveRepository.save(leave));
    }

    public long countByStatus(LeaveStatus status) { return leaveRepository.countByStatus(status); }

    private void ensurePending(LeaveRequest leave) {
        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new BusinessException("Only pending leave requests can be approved or rejected");
        }
    }

    private void validateDates(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) throw new BusinessException("Start date cannot be after end date");
    }

    private LeaveRequest getEntity(Long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found: " + id));
    }

    private LeaveResponse toResponse(LeaveRequest leave) {
        Employee employee = leave.getEmployee();
        return new LeaveResponse(leave.getId(), employee.getId(), employee.getName(), employee.getEmail(),
                employee.getDepartment().getName(), leave.getLeaveType(), leave.getStartDate(), leave.getEndDate(),
                leave.getReason(), leave.getStatus());
    }
}
