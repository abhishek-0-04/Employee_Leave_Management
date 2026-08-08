import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { LeaveRequest } from '../../models/models';

@Component({ selector: 'app-leave-history', standalone: true, imports: [CommonModule, RouterLink], template: `
  <div class="container page"><div class="toolbar"><div><h1>Leave History</h1><p>Review your requests and cancel anything still pending.</p></div><a routerLink="/apply-leave" class="btn btn-primary">Apply Leave</a></div>
  <div class="card"><div class="alert alert-error" *ngIf="error">{{ error }}</div><div *ngIf="loading" class="loading">Loading...</div><div class="table-wrap" *ngIf="!loading && leaves.length"><table><thead><tr><th>Type</th><th>Start</th><th>End</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead><tbody><tr *ngFor="let l of leaves"><td>{{l.leaveType}}</td><td>{{l.startDate}}</td><td>{{l.endDate}}</td><td>{{l.reason}}</td><td><span class="badge" [ngClass]="'badge-'+l.status.toLowerCase()">{{l.status}}</span></td><td><button *ngIf="l.status==='PENDING'" class="btn btn-danger" (click)="cancel(l)" [disabled]="busyId===l.id">{{busyId===l.id?'Cancelling...':'Cancel'}}</button><span *ngIf="l.status!=='PENDING'" class="muted">—</span></td></tr></tbody></table></div><div class="empty" *ngIf="!loading && !leaves.length">No leave requests found.</div></div></div>`, styles: [] })
export class LeaveHistoryComponent implements OnInit {
  private readonly auth=inject(AuthService); private readonly leaveService=inject(LeaveService); leaves:LeaveRequest[]=[]; loading=true; error=''; busyId:number|null=null;
  ngOnInit():void{const user=this.auth.getUser();if(user)this.load(user.id);}
  load(id:number):void{this.loading=true;this.leaveService.getByEmployee(id).subscribe({next:x=>{this.leaves=x;this.loading=false},error:e=>{this.error=e?.error?.message??'Unable to load history.';this.loading=false}})}
  cancel(leave:LeaveRequest):void{if(!confirm('Cancel this pending leave request?'))return;this.busyId=leave.id;this.leaveService.cancel(leave.id).subscribe({next:()=>{leave.status='CANCELLED';this.busyId=null},error:e=>{this.error=e?.error?.message??'Unable to cancel request.';this.busyId=null}})}
}
