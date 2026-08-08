import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="topbar" *ngIf="auth.isLoggedIn()">
      <div class="container nav">
        <a class="brand" [routerLink]="auth.isAdmin() ? '/admin' : '/dashboard'">LeaveFlow</a>
        <nav class="links">
          <a [routerLink]="auth.isAdmin() ? '/admin' : '/dashboard'">Dashboard</a>
          <ng-container *ngIf="!auth.isAdmin()">
            <a routerLink="/apply-leave">Apply Leave</a>
            <a routerLink="/leave-history">History</a>
            <a routerLink="/profile">Profile</a>
          </ng-container>
          <ng-container *ngIf="auth.isAdmin()">
            <a routerLink="/admin">Admin</a>
            <a routerLink="/admin/employees">Employees</a>
            <a routerLink="/admin/leaves">Leaves</a>
            <a routerLink="/admin/departments">Departments</a>
          </ng-container>
        </nav>
        <div class="user-area">
          <span>{{ auth.getUser()?.name }}</span>
          <button class="btn btn-secondary" (click)="logout()">Logout</button>
        </div>
      </div>
    </header>
    <main><router-outlet /></main>
  `,
  styles: [`
    .topbar { background: #101828; color: white; position: sticky; top: 0; z-index: 10; }
    .nav { min-height: 66px; display: flex; align-items: center; gap: 22px; }
    .brand { font-size: 1.25rem; font-weight: 800; letter-spacing: -.02em; }
    .links { display: flex; gap: 16px; align-items: center; flex: 1; flex-wrap: wrap; }
    .links a { color: #d0d5dd; font-size: .9rem; }
    .links a:hover { color: white; }
    .user-area { display: flex; align-items: center; gap: 10px; font-size: .85rem; }
    .user-area .btn { padding: 7px 11px; }
    @media (max-width: 850px) { .nav { padding: 10px 0; flex-wrap: wrap; } .links { order: 3; width: 100%; } .user-area { margin-left: auto; } }
  `]
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
}
