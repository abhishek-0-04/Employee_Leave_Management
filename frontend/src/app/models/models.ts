export type Role = 'EMPLOYEE' | 'ADMIN';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type LeaveType = 'CASUAL' | 'SICK' | 'ANNUAL' | 'OTHER';

export interface Employee {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  departmentName: string;
  role: Role;
}

export interface Department {
  id: number;
  name: string;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  departmentName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface LoginResponse extends Employee {}

export interface LeavePayload {
  employeeId: number;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}
