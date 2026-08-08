package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.LeaveStatus;
import com.example.leavemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DashboardService {
    private final EmployeeRepository employeeRepository;
    private final LeaveService leaveService;

    public DashboardService(EmployeeRepository employeeRepository, LeaveService leaveService) {
        this.employeeRepository = employeeRepository;
        this.leaveService = leaveService;
    }

    public Map<String, Long> adminStats() {
        return Map.of(
                "totalEmployees", employeeRepository.count(),
                "totalLeaveRequests", leaveService.countByStatus(LeaveStatus.PENDING)
                        + leaveService.countByStatus(LeaveStatus.APPROVED)
                        + leaveService.countByStatus(LeaveStatus.REJECTED)
                        + leaveService.countByStatus(LeaveStatus.CANCELLED),
                "pendingRequests", leaveService.countByStatus(LeaveStatus.PENDING),
                "approvedRequests", leaveService.countByStatus(LeaveStatus.APPROVED),
                "rejectedRequests", leaveService.countByStatus(LeaveStatus.REJECTED)
        );
    }
}
