import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api';
import { Department } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly http = inject(HttpClient);
  getAll(): Observable<Department[]> { return this.http.get<Department[]>(`${API_BASE_URL}/departments`); }
  create(name: string): Observable<Department> { return this.http.post<Department>(`${API_BASE_URL}/departments`, { name }); }
  update(id: number, name: string): Observable<Department> { return this.http.put<Department>(`${API_BASE_URL}/departments/${id}`, { name }); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${API_BASE_URL}/departments/${id}`); }
}
