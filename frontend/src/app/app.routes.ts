import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { DashboardComponent } from './components/employee/dashboard.component';
import { ProfileComponent } from './components/employee/profile.component';
import { ApplyLeaveComponent } from './components/employee/apply-leave.component';
import { LeaveHistoryComponent } from './components/employee/leave-history.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { EmployeeManagementComponent } from './components/admin/employee-management.component';
import { LeaveManagementComponent } from './components/admin/leave-management.component';
import { DepartmentManagementComponent } from './components/admin/department-management.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [authGuard] },
  { path: 'leave-history', component: LeaveHistoryComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/employees', component: EmployeeManagementComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/leaves', component: LeaveManagementComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/departments', component: DepartmentManagementComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
