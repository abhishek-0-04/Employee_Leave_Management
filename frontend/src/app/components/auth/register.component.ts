import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/models';

@Component({
  selector: 'app-register', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page"><div class="auth-card wide">
      <div class="logo">LeaveFlow</div><h1>Create employee account</h1><p>Registration always creates an EMPLOYEE account.</p>
      <div class="alert alert-error" *ngIf="error">{{ error }}</div><div class="alert alert-success" *ngIf="success">{{ success }}</div>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
        <div class="form-field"><label>Name</label><input formControlName="name"><span class="error" *ngIf="invalid('name')">Name is required.</span></div>
        <div class="form-field"><label>Email</label><input type="email" formControlName="email"><span class="error" *ngIf="invalid('email')">Enter a valid email.</span></div>
        <div class="form-field"><label>Password</label><input type="password" formControlName="password"><span class="error" *ngIf="invalid('password')">Use at least 6 characters.</span></div>
        <div class="form-field"><label>Department</label><select formControlName="departmentId"><option [ngValue]="null">Select department</option><option *ngFor="let d of departments" [ngValue]="d.id">{{ d.name }}</option></select><span class="error" *ngIf="invalid('departmentId')">Choose a department.</span></div>
        <div class="form-field full"><button class="btn btn-primary" [disabled]="form.invalid || loading">{{ loading ? 'Creating...' : 'Create account' }}</button></div>
      </form>
      <p class="switch">Already registered? <a routerLink="/login">Back to login</a></p>
    </div></div>
  `,
  styles: [`.auth-page{min-height:100vh;display:grid;place-items:center;padding:20px;background:linear-gradient(135deg,#eff6ff,#f8fafc)}.auth-card{width:min(520px,100%);background:#fff;border:1px solid #e4e7ec;border-radius:20px;padding:34px;box-shadow:0 20px 50px rgba(15,23,42,.08)}.wide{width:min(680px,100%)}.logo{font-weight:850;color:#2563eb;margin-bottom:22px}.switch{text-align:center}.switch a{color:#2563eb;font-weight:700}`]
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder); private readonly auth = inject(AuthService); private readonly deptService = inject(DepartmentService); private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]], departmentId: [null as number | null, Validators.required] });
  departments: Department[] = []; loading = false; error = ''; success = '';
  ngOnInit(): void { this.deptService.getAll().subscribe({ next: d => this.departments = d, error: e => this.error = e?.error?.message ?? 'Unable to load departments.' }); }
  invalid(control: 'name'|'email'|'password'|'departmentId'): boolean { const c = this.form.controls[control]; return c.touched && c.invalid; }
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = ''; const v = this.form.getRawValue();
    this.auth.register({ name: v.name, email: v.email, password: v.password, departmentId: v.departmentId as number }).subscribe({
      next: () => { this.success = 'Account created. Redirecting to login...'; setTimeout(() => this.router.navigate(['/login']), 700); },
      error: e => { this.error = e?.error?.message ?? 'Registration failed.'; this.loading = false; }
    });
  }
}
