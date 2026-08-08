import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { LeaveRequest } from '../../models/models';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule, RouterLink], template: `
  <div class="container page"><div class="toolbar"><div><h1>Employee Dashboard</h1><p>Welcome back, {{ user?.name }}. Here's your leave overview.</p></div><a routerLink="/apply-leave" class="btn btn-primary">Apply for Leave</a></div>
  <div class="grid grid-4"><div class="card stat-card"><div><div class="stat-label">Total Leaves</div><div class="stat-value">{{ leaves.length }}</div></div></div><div class="card stat-card"><div><div class="stat-label">Pending</div><div class="stat-value">{{ count('PENDING') }}</div></div></div><div class="card stat-card"><div><div class="stat-label">Approved</div><div class="stat-value">{{ count('APPROVED') }}</div></div></div><div class="card stat-card"><div><div class="stat-label">Rejected</div><div class="stat-value">{{ count('REJECTED') }}</div></div></div></div>
  <div class="grid grid-2 actions-grid"><a routerLink="/leave-history" class="card action-card"><h3>View leave history</h3><p>Track every request and cancel pending requests.</p></a><a routerLink="/profile" class="card action-card"><h3>View profile</h3><p>Review your account and department details.</p></a></div>
  <div class="card"><h2>Recent requests</h2><div *ngIf="loading" class="loading">Loading leave requests...</div><div *ngIf="!loading && leaves.length === 0" class="empty">No leave requests yet.</div><div class="table-wrap" *ngIf="!loading && leaves.length"><table><thead><tr><th>Type</th><th>Dates</th><th>Reason</th><th>Status</th></tr></thead><tbody><tr *ngFor="let l of leaves | slice:0:5"><td>{{ l.leaveType }}</td><td>{{ l.startDate }} → {{ l.endDate }}</td><td>{{ l.reason }}</td><td><span class="badge" [ngClass]="'badge-' + l.status.toLowerCase()">{{ l.status }}</span></td></tr></tbody></table></div></div>
  </div>`, styles: [`.actions-grid{margin-top:18px}.action-card{transition:.15s ease}.action-card:hover{transform:translateY(-2px);border-color:#bfdbfe}`] })
export class DashboardComponent implements OnInit {
  private readonly auth = inject(AuthService); private readonly leaveService = inject(LeaveService);
  user = this.auth.getUser(); leaves: LeaveRequest[] = []; loading = true;
  ngOnInit(): void { if (this.user) this.leaveService.getByEmployee(this.user.id).subscribe({ next: x => { this.leaves = x; this.loading = false; }, error: () => this.loading = false }); }
  count(status: LeaveRequest['status']): number { return this.leaves.filter(x => x.status === status).length; }
}
