import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  template: `
    <div class="auth-page">

      <!-- LEFT BRANDING SECTION -->
      <section class="brand-section">

        <div class="brand-content">

          <div class="brand-logo">
            <div class="logo-icon">
              LF
            </div>
            <span>LeaveFlow</span>
          </div>

          <div class="brand-text">
            <span class="eyebrow">EMPLOYEE EXPERIENCE</span>

            <h2>
              Leave management,
              <span>made effortless.</span>
            </h2>

            <p>
              Simplify leave requests, approvals, and employee
              management — all from one place.
            </p>
          </div>

          <!-- SIMPLE DASHBOARD VISUAL -->
          <div class="dashboard-preview">

            <div class="preview-header">
              <div>
                <span class="preview-title">Leave Overview</span>
                <span class="preview-subtitle">August 2026</span>
              </div>

              <div class="preview-avatar">
                A
              </div>
            </div>

            <div class="stats-row">

              <div class="mini-stat">
                <div class="mini-icon blue">✓</div>
                <div>
                  <strong>12</strong>
                  <span>Approved</span>
                </div>
              </div>

              <div class="mini-stat">
                <div class="mini-icon orange">◷</div>
                <div>
                  <strong>03</strong>
                  <span>Pending</span>
                </div>
              </div>

              <div class="mini-stat">
                <div class="mini-icon green">●</div>
                <div>
                  <strong>18</strong>
                  <span>Available</span>
                </div>
              </div>

            </div>

            <div class="leave-progress">

              <div class="progress-heading">
                <span>Annual Leave</span>
                <strong>12 / 18 days</strong>
              </div>

              <div class="progress-track">
                <div class="progress-bar"></div>
              </div>

            </div>

          </div>

          <div class="trust-text">
            <span class="trust-dot"></span>
            Designed for modern teams
          </div>

        </div>

      </section>


      <!-- RIGHT LOGIN SECTION -->
      <section class="login-section">

        <div class="auth-card">

          <!-- MOBILE LOGO -->
          <div class="mobile-logo">
            <div class="logo-icon">
              LF
            </div>
            <span>LeaveFlow</span>
          </div>

          <div class="login-heading">

            <span class="welcome-badge">
              Welcome back
            </span>

            <h1>Sign in to your account</h1>

            <p>
              Enter your credentials to access your dashboard.
            </p>

          </div>


          <!-- ERROR -->
          <div
            class="alert alert-error"
            *ngIf="error"
          >
            <span class="alert-icon">!</span>
            <span>{{ error }}</span>
          </div>


          <!-- LOGIN FORM -->
          <form
            [formGroup]="form"
            (ngSubmit)="submit()"
          >

            <!-- EMAIL -->
            <div class="form-field">

              <label for="email">
                Email address
              </label>

              <div
                class="input-wrapper"
                [class.input-error]="
                  form.controls.email.touched &&
                  form.controls.email.invalid
                "
              >

                <span class="input-icon">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>

                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  placeholder="you@company.com"
                  autocomplete="email"
                />

              </div>

              <span
                class="error"
                *ngIf="
                  form.controls.email.touched &&
                  form.controls.email.invalid
                "
              >
                Please enter a valid email address.
              </span>

            </div>


            <!-- PASSWORD -->
            <div class="form-field">

              <div class="label-row">

                <label for="password">
                  Password
                </label>

                <a
                  routerLink="/forgot-password"
                  class="forgot-link"
                >
                  Forgot password?
                </a>

              </div>

              <div
                class="input-wrapper"
                [class.input-error]="
                  form.controls.password.touched &&
                  form.controls.password.invalid
                "
              >

                <span class="input-icon">

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                    />

                    <path
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                    />

                  </svg>

                </span>

                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />

                <button
                  type="button"
                  class="password-toggle"
                  (click)="showPassword = !showPassword"
                  [attr.aria-label]="
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  "
                >
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>

              </div>

              <span
                class="error"
                *ngIf="
                  form.controls.password.touched &&
                  form.controls.password.invalid
                "
              >
                Password is required.
              </span>

            </div>


            <!-- REMEMBER ME -->
            <div class="form-options">

              <label class="remember">

                <input type="checkbox">

                <span>
                  Remember me
                </span>

              </label>

            </div>


            <!-- LOGIN BUTTON -->
            <button
              type="submit"
              class="login-btn"
              [disabled]="form.invalid || loading"
            >

              <span
                class="spinner"
                *ngIf="loading"
              ></span>

              <span>
                {{ loading ? 'Signing you in...' : 'Sign in' }}
              </span>

              <span
                class="arrow"
                *ngIf="!loading"
              >
                →
              </span>

            </button>

          </form>


          <!-- DEMO ACCOUNTS -->
          <div class="demo-section">

            <div class="demo-header">
              <span class="demo-icon">i</span>
              <span>Demo accounts</span>
            </div>

            <div class="demo-account">

              <div class="account-role">
                <span class="role-dot admin"></span>
                Admin
              </div>

              <code>
                admin@example.com
              </code>

              <span class="separator">/</span>

              <code>
                Admin@123
              </code>

            </div>

            <div class="demo-account">

              <div class="account-role">
                <span class="role-dot employee"></span>
                Employee
              </div>

              <code>
                employee@example.com
              </code>

              <span class="separator">/</span>

              <code>
                Employee@123
              </code>

            </div>

          </div>


          <!-- REGISTER -->
          <div class="register-section">

            <span>
              Don't have an account?
            </span>

            <a routerLink="/register">
              Create an account
              <span>→</span>
            </a>

          </div>


          <div class="security-note">
            <span>🔒</span>
            Your information is securely protected.
          </div>

        </div>

      </section>

    </div>
  `,

  styles: [`

    /* =========================
       PAGE
    ========================= */

    .auth-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 48% 52%;
      background: #f8fafc;
    }


    /* =========================
       LEFT BRAND SECTION
    ========================= */

    .brand-section {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(
          circle at 20% 20%,
          rgba(59, 130, 246, .18),
          transparent 32%
        ),
        linear-gradient(
          145deg,
          #0f172a 0%,
          #172554 55%,
          #1e40af 100%
        );

      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px;
    }

    .brand-section::before {
      content: "";
      position: absolute;
      width: 420px;
      height: 420px;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 50%;
      top: -180px;
      right: -150px;
    }

    .brand-section::after {
      content: "";
      position: absolute;
      width: 300px;
      height: 300px;
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 50%;
      bottom: -130px;
      left: -120px;
    }

    .brand-content {
      width: min(540px, 100%);
      position: relative;
      z-index: 1;
    }


    /* =========================
       LOGO
    ========================= */

    .brand-logo,
    .mobile-logo {
      display: flex;
      align-items: center;
      gap: 11px;
      font-size: 21px;
      font-weight: 800;
      letter-spacing: -.5px;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      border-radius: 11px;
      display: grid;
      place-items: center;
      background: #3b82f6;
      color: white;
      font-size: 13px;
      font-weight: 900;
      box-shadow: 0 8px 20px rgba(59,130,246,.3);
    }


    /* =========================
       BRAND TEXT
    ========================= */

    .brand-text {
      margin-top: 90px;
    }

    .eyebrow {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.8px;
      color: #93c5fd;
      margin-bottom: 17px;
    }

    .brand-text h2 {
      font-size: clamp(34px, 4vw, 52px);
      line-height: 1.08;
      letter-spacing: -2px;
      margin: 0;
      max-width: 500px;
    }

    .brand-text h2 span {
      color: #60a5fa;
    }

    .brand-text p {
      margin-top: 22px;
      max-width: 450px;
      color: #cbd5e1;
      line-height: 1.7;
      font-size: 16px;
    }


    /* =========================
       DASHBOARD PREVIEW
    ========================= */

    .dashboard-preview {
      margin-top: 42px;
      width: 100%;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 18px;
      padding: 20px;
      backdrop-filter: blur(14px);
      box-shadow: 0 25px 60px rgba(0,0,0,.18);
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .preview-title {
      display: block;
      font-size: 14px;
      font-weight: 700;
    }

    .preview-subtitle {
      display: block;
      margin-top: 4px;
      color: #94a3b8;
      font-size: 11px;
    }

    .preview-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #3b82f6;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 13px;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 20px;
    }

    .mini-stat {
      background: rgba(255,255,255,.06);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      gap: 9px;
      align-items: center;
    }

    .mini-stat strong {
      display: block;
      font-size: 17px;
    }

    .mini-stat span {
      display: block;
      color: #94a3b8;
      font-size: 10px;
      margin-top: 2px;
    }

    .mini-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: grid;
      place-items: center;
      font-size: 11px;
    }

    .mini-icon.blue {
      background: rgba(59,130,246,.2);
      color: #60a5fa;
    }

    .mini-icon.orange {
      background: rgba(245,158,11,.15);
      color: #fbbf24;
    }

    .mini-icon.green {
      background: rgba(34,197,94,.15);
      color: #4ade80;
    }

    .leave-progress {
      margin-top: 20px;
    }

    .progress-heading {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #cbd5e1;
      margin-bottom: 8px;
    }

    .progress-track {
      height: 6px;
      border-radius: 10px;
      background: rgba(255,255,255,.1);
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      width: 67%;
      border-radius: inherit;
      background: #60a5fa;
    }

    .trust-text {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 28px;
      color: #94a3b8;
      font-size: 12px;
    }

    .trust-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 4px rgba(74,222,128,.1);
    }


    /* =========================
       LOGIN SECTION
    ========================= */

    .login-section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px;
    }

    .auth-card {
      width: min(450px, 100%);
    }

    .mobile-logo {
      display: none;
      color: #172033;
      margin-bottom: 45px;
    }


    /* =========================
       HEADING
    ========================= */

    .welcome-badge {
      display: inline-block;
      color: #2563eb;
      background: #eff6ff;
      border-radius: 999px;
      padding: 6px 11px;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 14px;
    }

    .login-heading h1 {
      margin: 0;
      font-size: 34px;
      line-height: 1.15;
      letter-spacing: -1.3px;
      color: #172033;
    }

    .login-heading p {
      margin: 11px 0 30px;
      color: #667085;
      line-height: 1.6;
      font-size: 14px;
    }


    /* =========================
       FORM
    ========================= */

    .form-field {
      margin-bottom: 20px;
    }

    .form-field label {
      display: block;
      margin-bottom: 8px;
      color: #344054;
      font-size: 13px;
      font-weight: 700;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .label-row label {
      margin-bottom: 0;
    }

    .forgot-link {
      color: #2563eb;
      font-size: 12px;
      font-weight: 700;
    }

    .input-wrapper {
      height: 48px;
      display: flex;
      align-items: center;
      border: 1px solid #d0d5dd;
      border-radius: 11px;
      background: white;
      transition: .2s ease;
      overflow: hidden;
    }

    .input-wrapper:focus-within {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37,99,235,.08);
    }

    .input-wrapper.input-error {
      border-color: #dc2626;
    }

    .input-icon {
      display: grid;
      place-items: center;
      color: #98a2b3;
      margin-left: 14px;
    }

    .input-wrapper input {
      flex: 1;
      min-width: 0;
      height: 100%;
      border: 0;
      outline: 0;
      padding: 0 12px;
      font-size: 14px;
      color: #172033;
      background: transparent;
    }

    .input-wrapper input::placeholder {
      color: #98a2b3;
    }

    .password-toggle {
      border: 0;
      background: transparent;
      color: #2563eb;
      font-size: 12px;
      font-weight: 750;
      padding: 10px 14px;
    }

    .error {
      display: block;
      color: #dc2626;
      font-size: 11px;
      margin-top: 6px;
    }


    /* =========================
       OPTIONS
    ========================= */

    .form-options {
      margin-top: -4px;
      margin-bottom: 20px;
    }

    .remember {
      display: flex !important;
      align-items: center;
      gap: 8px;
      color: #667085 !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      cursor: pointer;
    }

    .remember input {
      width: 15px;
      height: 15px;
      accent-color: #2563eb;
    }


    /* =========================
       LOGIN BUTTON
    ========================= */

    .login-btn {
      width: 100%;
      height: 48px;
      border: 0;
      border-radius: 11px;
      background: #2563eb;
      color: white;
      font-size: 14px;
      font-weight: 750;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      transition: .2s ease;
      box-shadow: 0 8px 20px rgba(37,99,235,.2);
    }

    .login-btn:hover:not(:disabled) {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 11px 25px rgba(37,99,235,.25);
    }

    .login-btn:disabled {
      opacity: .65;
      cursor: not-allowed;
    }

    .arrow {
      font-size: 17px;
    }

    .spinner {
      width: 15px;
      height: 15px;
      border: 2px solid rgba(255,255,255,.35);
      border-top-color: white;
      border-radius: 50%;
      animation: spin .7s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }


    /* =========================
       DEMO ACCOUNTS
    ========================= */

    .demo-section {
      margin-top: 25px;
      border: 1px solid #e4e7ec;
      border-radius: 13px;
      padding: 14px;
      background: #fafafa;
    }

    .demo-header {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      font-weight: 750;
      color: #344054;
      margin-bottom: 12px;
    }

    .demo-icon {
      width: 17px;
      height: 17px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 10px;
      font-weight: 800;
    }

    .demo-account {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px;
      padding: 8px 0;
      font-size: 10px;
      color: #667085;
    }

    .account-role {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 75px;
      color: #344054;
      font-weight: 700;
    }

    .role-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .role-dot.admin {
      background: #8b5cf6;
    }

    .role-dot.employee {
      background: #10b981;
    }

    code {
      background: #f2f4f7;
      padding: 4px 6px;
      border-radius: 5px;
      color: #475467;
      font-size: 9px;
    }

    .separator {
      color: #98a2b3;
    }


    /* =========================
       ALERT
    ========================= */

    .alert {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 11px 13px;
      border-radius: 10px;
      margin-bottom: 18px;
      font-size: 12px;
    }

    .alert-error {
      color: #991b1b;
      background: #fef2f2;
      border: 1px solid #fecaca;
    }

    .alert-icon {
      width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #fee2e2;
      font-weight: 800;
    }


    /* =========================
       REGISTER
    ========================= */

    .register-section {
      display: flex;
      justify-content: center;
      gap: 5px;
      margin-top: 25px;
      font-size: 12px;
      color: #667085;
    }

    .register-section a {
      color: #2563eb;
      font-weight: 750;
    }

    .register-section a span {
      margin-left: 2px;
    }

    .security-note {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-top: 25px;
      color: #98a2b3;
      font-size: 10px;
    }


    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 900px) {

      .auth-page {
        grid-template-columns: 1fr;
      }

      .brand-section {
        display: none;
      }

      .login-section {
        min-height: 100vh;
        padding: 30px 20px;
      }

      .mobile-logo {
        display: flex;
      }

    }


    @media (max-width: 480px) {

      .login-section {
        padding: 25px 18px;
        align-items: flex-start;
        padding-top: 45px;
      }

      .mobile-logo {
        margin-bottom: 40px;
      }

      .login-heading h1 {
        font-size: 29px;
      }

      .demo-account {
        display: block;
        line-height: 1.8;
      }

      .account-role {
        margin-bottom: 3px;
      }

    }

  `]
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],

    password: [
      '',
      Validators.required
    ]
  });

  loading = false;
  error = '';

  showPassword = false;
  rememberMe = false;


  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } =
      this.form.getRawValue();

    this.auth.login(email, password).subscribe({

      next: user => {

        this.router.navigate([
          user.role === 'ADMIN'
            ? '/admin'
            : '/dashboard'
        ]);

      },

      error: err => {

        this.error =
          err?.error?.message ??
          'Unable to sign in. Check the backend and credentials.';

        this.loading = false;

      }

    });

  }

}