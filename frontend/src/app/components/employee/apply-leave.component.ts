import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { LeaveType } from '../../models/models';

@Component({ selector: 'app-apply-leave', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `
  <div class="container page"><div class="toolbar"><div><h1>Apply for Leave</h1><p>Submit a new leave request for your manager to review.</p></div><a routerLink="/leave-history" class="btn btn-secondary">View History</a></div>
  <div class="card form-card"><div class="alert alert-error" *ngIf="error">{{ error }}</div><div class="alert alert-success" *ngIf="success">{{ success }}</div><form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
    <div class="form-field"><label>Leave Type</label><select formControlName="leaveType"><option *ngFor="let t of leaveTypes" [ngValue]="t">{{ t }}</option></select></div>
    <div></div>
    <div class="form-field"><label>Start Date</label><input type="date" formControlName="startDate"><span class="error" *ngIf="invalid('startDate')">Start date is required.</span></div>
    <div class="form-field"><label>End Date</label><input type="date" formControlName="endDate"><span class="error" *ngIf="invalid('endDate')">End date is required.</span></div>
    <div class="form-field full"><label>Reason</label><textarea formControlName="reason" placeholder="Briefly explain the reason for your leave"></textarea><span class="error" *ngIf="invalid('reason')">Reason is required.</span></div>
    <div class="form-field full actions"><button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">{{ loading ? 'Submitting...' : 'Submit Leave Request' }}</button></div>
  </form></div></div>`, styles: [`.form-card{max-width:850px}`] })
export class ApplyLeaveComponent implements OnInit {
  private readonly fb = inject(FormBuilder); private readonly auth = inject(AuthService); private readonly leaveService = inject(LeaveService); private readonly router = inject(Router);
  readonly leaveTypes: LeaveType[] = ['CASUAL','SICK','ANNUAL','OTHER'];
  readonly form = this.fb.nonNullable.group({ leaveType: ['CASUAL' as LeaveType, Validators.required], startDate: ['', Validators.required], endDate: ['', Validators.required], reason: ['', [Validators.required, Validators.maxLength(500)]] });
  loading=false; error=''; success=''; minDate='';
  ngOnInit(): void { this.minDate = new Date().toISOString().slice(0,10); }
  invalid(control: 'startDate'|'endDate'|'reason'): boolean { const c=this.form.controls[control]; return c.touched && c.invalid; }
  submit(): void {
    if(this.form.invalid){this.form.markAllAsTouched();return;} const user=this.auth.getUser(); if(!user)return;
    const v=this.form.getRawValue(); if(v.startDate>v.endDate){this.error='Start date cannot be after end date.';return;}
    this.loading=true;this.error='';this.success=''; this.leaveService.create({employeeId:user.id,...v}).subscribe({next:()=>{this.success='Leave request submitted successfully.';this.loading=false;this.form.reset({leaveType:'CASUAL',startDate:'',endDate:'',reason:''});setTimeout(()=>this.router.navigate(['/leave-history']),600)},error:e=>{this.error=e?.error?.message??'Unable to submit leave request.';this.loading=false}});
  }
}
