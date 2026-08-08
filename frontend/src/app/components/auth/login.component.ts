import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="logo">LeaveFlow</div>
        <h1>Welcome back</h1>
        <p>Sign in to manage employee leave requests.</p>
        <div class="alert alert-error" *ngIf="error">{{ error }}</div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="form-field"><label>Email</label><input type="email" formControlName="email" placeholder="you@example.com"><span class="error" *ngIf="form.controls.email.touched && form.controls.email.invalid">Enter a valid email.</span></div>
          <div class="form-field"><label>Password</label><input type="password" formControlName="password" placeholder="••••••••"><span class="error" *ngIf="form.controls.password.touched && form.controls.password.invalid">Password is required.</span></div>
          <button class="btn btn-primary full-btn" [disabled]="form.invalid || loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
        </form>
        <div class="demo"><strong>Demo accounts</strong><br>Admin: admin@example.com / Admin@123<br>Employee: employee@example.com / Employee@123</div>
        <p class="switch">New employee? <a routerLink="/register">Create an account</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 100vh; display: grid; place-items: center; padding: 20px; background: linear-gradient(135deg, #eff6ff, #f8fafc); }
    .auth-card { width: min(440px, 100%); background: white; border: 1px solid #e4e7ec; border-radius: 20px; padding: 34px; box-shadow: 0 20px 50px rgba(15,23,42,.08); }
    .logo { font-weight: 850; color: #2563eb; margin-bottom: 22px; }
    .full-btn { width: 100%; margin-top: 8px; }
    .demo { margin-top: 18px; padding: 12px; background: #f8fafc; border-radius: 10px; font-size: .8rem; line-height: 1.65; color: #475467; }
    .switch { text-align: center; margin-top: 20px; }
    .switch a { color: #2563eb; font-weight: 700; }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  loading = false; error = '';

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: user => this.router.navigate([user.role === 'ADMIN' ? '/admin' : '/dashboard']),
      error: err => { this.error = err?.error?.message ?? 'Unable to sign in. Check the backend and credentials.'; this.loading = false; }
    });
  }
}
