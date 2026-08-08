import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api';
import { Employee, LoginResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'employee-leave-user';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, { email, password }).pipe(
      tap(user => localStorage.setItem(this.storageKey, JSON.stringify(user)))
    );
  }

  register(payload: { name: string; email: string; password: string; departmentId: number }): Observable<Employee> {
    return this.http.post<Employee>(`${API_BASE_URL}/auth/register`, payload);
  }

  logout(): void { localStorage.removeItem(this.storageKey); }
  getUser(): LoginResponse | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try { return JSON.parse(raw) as LoginResponse; } catch { this.logout(); return null; }
  }
  isLoggedIn(): boolean { return this.getUser() !== null; }
  isAdmin(): boolean { return this.getUser()?.role === 'ADMIN'; }
}
