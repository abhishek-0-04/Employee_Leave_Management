package com.example.leavemanagement.dto;

import com.example.leavemanagement.entity.LeaveStatus;
import com.example.leavemanagement.entity.LeaveType;
import java.time.LocalDate;

public record LeaveResponse(
        Long id,
        Long employeeId,
        String employeeName,
        String employeeEmail,
        String departmentName,
        LeaveType leaveType,
        LocalDate startDate,
        LocalDate endDate,
        String reason,
        LeaveStatus status
) {}
