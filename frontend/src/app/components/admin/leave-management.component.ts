import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { LeaveRequest, LeaveStatus } from '../../models/models';
import { LeaveService } from '../../services/leave.service';

@Component({selector:'app-leave-management',standalone:true,imports:[CommonModule, FormsModule],template:`
<div class="container page"><div class="toolbar"><div><h1>Leave Requests</h1><p>Review employee leave requests and take action on pending items.</p></div><select [(ngModel)]="filter" (change)="applyFilter()" class="filter"><option value="ALL">All statuses</option><option value="PENDING">Pending</option><option value="APPROVED">Approved</option><option value="REJECTED">Rejected</option><option value="CANCELLED">Cancelled</option></select></div>
<div class="card"><div class="alert alert-error" *ngIf="error">{{error}}</div><div class="loading" *ngIf="loading">Loading...</div><div class="table-wrap" *ngIf="!loading"><table><thead><tr><th>Employee</th><th>Department</th><th>Type</th><th>Dates</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr *ngFor="let l of visibleLeaves"><td>{{l.employeeName}}<br><small class="muted">{{l.employeeEmail}}</small></td><td>{{l.departmentName}}</td><td>{{l.leaveType}}</td><td>{{l.startDate}} → {{l.endDate}}</td><td>{{l.reason}}</td><td><span class="badge" [ngClass]="'badge-'+l.status.toLowerCase()">{{l.status}}</span></td><td><div class="actions" *ngIf="l.status==='PENDING'"><button class="btn btn-success" (click)="approve(l)" [disabled]="busyId===l.id">Approve</button><button class="btn btn-danger" (click)="reject(l)" [disabled]="busyId===l.id">Reject</button></div><span *ngIf="l.status!=='PENDING'" class="muted">—</span></td></tr></tbody></table></div><div class="empty" *ngIf="!loading && !visibleLeaves.length">No requests match the filter.</div></div></div>`,styles:[`.filter{width:190px}`]})
export class LeaveManagementComponent implements OnInit {
 private readonly service=inject(LeaveService);leaves:LeaveRequest[]=[];visibleLeaves:LeaveRequest[]=[];loading=true;error='';busyId:number|null=null;filter:'ALL'|LeaveStatus='ALL';
 ngOnInit():void{this.load()}load():void{this.loading=true;this.service.getAll().subscribe({next:x=>{this.leaves=x;this.applyFilter();this.loading=false},error:e=>{this.error=e?.error?.message??'Unable to load requests.';this.loading=false}})}
 applyFilter():void{this.visibleLeaves=this.filter==='ALL'?this.leaves:this.leaves.filter(x=>x.status===this.filter)}
 approve(l:LeaveRequest):void{this.busyId=l.id;this.service.approve(l.id).subscribe({next:x=>{Object.assign(l,x);this.busyId=null},error:e=>{this.error=e?.error?.message??'Unable to approve.';this.busyId=null}})}
 reject(l:LeaveRequest):void{this.busyId=l.id;this.service.reject(l.id).subscribe({next:x=>{Object.assign(l,x);this.busyId=null},error:e=>{this.error=e?.error?.message??'Unable to reject.';this.busyId=null}})}
}
