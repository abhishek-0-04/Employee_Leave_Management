import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api';
import { Employee } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  getAll(): Observable<Employee[]> { return this.http.get<Employee[]>(`${API_BASE_URL}/employees`); }
  getById(id: number): Observable<Employee> { return this.http.get<Employee>(`${API_BASE_URL}/employees/${id}`); }
  create(payload: unknown): Observable<Employee> { return this.http.post<Employee>(`${API_BASE_URL}/employees`, payload); }
  update(id: number, payload: unknown): Observable<Employee> { return this.http.put<Employee>(`${API_BASE_URL}/employees/${id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${API_BASE_URL}/employees/${id}`); }
}
