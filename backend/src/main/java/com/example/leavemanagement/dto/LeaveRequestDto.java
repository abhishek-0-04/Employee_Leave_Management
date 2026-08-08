package com.example.leavemanagement.dto;

import com.example.leavemanagement.entity.LeaveType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record LeaveRequestDto(
        @NotNull(message = "Employee is required") Long employeeId,
        @NotNull(message = "Leave type is required") LeaveType leaveType,
        @NotNull(message = "Start date is required") LocalDate startDate,
        @NotNull(message = "End date is required") LocalDate endDate,
        @NotBlank(message = "Reason is required") String reason
) {}
