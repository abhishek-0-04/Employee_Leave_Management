import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department, Employee, Role } from '../../models/models';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({selector:'app-employee-management',standalone:true,imports:[CommonModule,ReactiveFormsModule],template:`
<div class="container page"><div class="toolbar"><div><h1>Employee Management</h1><p>Manage employee accounts and departments.</p></div><button class="btn btn-primary" (click)="startCreate()">+ Add Employee</button></div>
<div class="grid grid-2" *ngIf="editing"><div class="card"><h2>{{editingId?'Update':'Create'}} Employee</h2><div class="alert alert-error" *ngIf="error">{{error}}</div><form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
<div class="form-field"><label>Name</label><input formControlName="name"></div><div class="form-field"><label>Email</label><input type="email" formControlName="email"></div><div class="form-field"><label>Password {{editingId?'(optional)':''}}</label><input type="password" formControlName="password"></div><div class="form-field"><label>Department</label><select formControlName="departmentId"><option [ngValue]="null">Select</option><option *ngFor="let d of departments" [ngValue]="d.id">{{d.name}}</option></select></div><div class="form-field"><label>Role</label><select formControlName="role"><option value="EMPLOYEE">EMPLOYEE</option><option value="ADMIN">ADMIN</option></select></div><div class="form-field full actions"><button class="btn btn-primary" [disabled]="form.invalid || saving">{{saving?'Saving...':'Save'}}</button><button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button></div></form></div></div>
<div class="card"><div class="alert alert-error" *ngIf="listError">{{listError}}</div><div class="loading" *ngIf="loading">Loading...</div><div class="table-wrap" *ngIf="!loading"><table><thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Role</th><th>Actions</th></tr></thead><tbody><tr *ngFor="let e of employees"><td>{{e.name}}</td><td>{{e.email}}</td><td>{{e.departmentName}}</td><td>{{e.role}}</td><td class="actions"><button class="btn btn-secondary" (click)="edit(e)">Edit</button><button class="btn btn-danger" (click)="remove(e)">Delete</button></td></tr></tbody></table></div></div>
</div>`,styles:[``]})
export class EmployeeManagementComponent implements OnInit {
 private readonly fb=inject(FormBuilder);private readonly service=inject(EmployeeService);private readonly deptService=inject(DepartmentService);
 employees:Employee[]=[];departments:Department[]=[];loading=true;saving=false;editing=false;editingId:number|null=null;error='';listError='';
 readonly form=this.fb.nonNullable.group({name:['',Validators.required],email:['',[Validators.required,Validators.email]],password:[''],departmentId:[null as number|null,Validators.required],role:['EMPLOYEE' as Role,Validators.required]});
 ngOnInit():void{this.load();this.deptService.getAll().subscribe({next:x=>this.departments=x,error:e=>this.listError=e?.error?.message??'Unable to load departments.'});}
 load():void{this.loading=true;this.service.getAll().subscribe({next:x=>{this.employees=x;this.loading=false},error:e=>{this.listError=e?.error?.message??'Unable to load employees.';this.loading=false}})}
 startCreate():void{this.editing=true;this.editingId=null;this.error='';this.form.reset({name:'',email:'',password:'',departmentId:null,role:'EMPLOYEE'});}
 edit(e:Employee):void{this.editing=true;this.editingId=e.id;this.error='';this.form.reset({name:e.name,email:e.email,password:'',departmentId:e.departmentId,role:e.role});}
 cancelEdit():void{this.editing=false;this.error='';}
 save():void{if(this.form.invalid){this.form.markAllAsTouched();return}const v=this.form.getRawValue();this.saving=true;this.error='';const req={...v,departmentId:v.departmentId as number,role:v.role as Role};const obs=this.editingId?this.service.update(this.editingId,req):this.service.create(req);obs.subscribe({next:()=>{this.saving=false;this.editing=false;this.load()},error:e=>{this.error=e?.error?.message??'Unable to save employee.';this.saving=false}})}
 remove(e:Employee):void{if(!confirm(`Delete ${e.name}? Their leave records will also be removed.`))return;this.service.delete(e.id).subscribe({next:()=>this.load(),error:err=>this.listError=err?.error?.message??'Unable to delete employee.'})}
}
