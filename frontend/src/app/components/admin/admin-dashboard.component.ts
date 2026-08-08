import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../core/api';

interface AdminStats { totalEmployees:number; totalLeaveRequests:number; pendingRequests:number; approvedRequests:number; rejectedRequests:number; }
@Component({ selector:'app-admin-dashboard', standalone:true, imports:[CommonModule,RouterLink], template:`
<div class="container page"><div class="toolbar"><div><h1>Admin Dashboard</h1><p>Monitor employees, departments, and leave requests.</p></div></div>
<div class="grid grid-4"><div class="card stat-card"><div><div class="stat-label">Employees</div><div class="stat-value">{{stats.totalEmployees}}</div></div></div><div class="card stat-card"><div><div class="stat-label">Leave Requests</div><div class="stat-value">{{stats.totalLeaveRequests}}</div></div></div><div class="card stat-card"><div><div class="stat-label">Pending</div><div class="stat-value">{{stats.pendingRequests}}</div></div></div><div class="card stat-card"><div><div class="stat-label">Approved</div><div class="stat-value">{{stats.approvedRequests}}</div></div></div><div class="card stat-card"><div><div class="stat-label">Rejected</div><div class="stat-value">{{stats.rejectedRequests}}</div></div></div></div>
<div class="grid grid-3 admin-links"><a class="card action-card" routerLink="/admin/employees"><h3>Employee Management</h3><p>View, create, update, and delete employees.</p></a><a class="card action-card" routerLink="/admin/leaves"><h3>Leave Management</h3><p>Approve, reject, filter, and inspect requests.</p></a><a class="card action-card" routerLink="/admin/departments"><h3>Departments</h3><p>Add, rename, or remove departments.</p></a></div>
</div>`, styles:[`.admin-links{margin-top:18px}.action-card{transition:.15s ease}.action-card:hover{transform:translateY(-2px);border-color:#bfdbfe}`]})
export class AdminDashboardComponent implements OnInit {
  private readonly http=inject(HttpClient); stats:AdminStats={totalEmployees:0,totalLeaveRequests:0,pendingRequests:0,approvedRequests:0,rejectedRequests:0};
  ngOnInit():void{this.http.get<AdminStats>(`${API_BASE_URL}/dashboard/admin`).subscribe({next:x=>this.stats=x});}
}
