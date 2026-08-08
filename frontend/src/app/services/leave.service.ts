import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api';
import { LeavePayload, LeaveRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private readonly http = inject(HttpClient);
  getAll(): Observable<LeaveRequest[]> { return this.http.get<LeaveRequest[]>(`${API_BASE_URL}/leaves`); }
  getByEmployee(employeeId: number): Observable<LeaveRequest[]> { return this.http.get<LeaveRequest[]>(`${API_BASE_URL}/leaves/employee/${employeeId}`); }
  create(payload: LeavePayload): Observable<LeaveRequest> { return this.http.post<LeaveRequest>(`${API_BASE_URL}/leaves`, payload); }
  update(id: number, payload: LeavePayload): Observable<LeaveRequest> { return this.http.put<LeaveRequest>(`${API_BASE_URL}/leaves/${id}`, payload); }
  cancel(id: number): Observable<LeaveRequest> { return this.http.delete<LeaveRequest>(`${API_BASE_URL}/leaves/${id}`); }
  approve(id: number): Observable<LeaveRequest> { return this.http.put<LeaveRequest>(`${API_BASE_URL}/leaves/${id}/approve`, {}); }
  reject(id: number): Observable<LeaveRequest> { return this.http.put<LeaveRequest>(`${API_BASE_URL}/leaves/${id}/reject`, {}); }
}
