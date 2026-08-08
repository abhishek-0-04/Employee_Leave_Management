import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '../../models/models';
import { DepartmentService } from '../../services/department.service';

@Component({selector:'app-department-management',standalone:true,imports:[CommonModule,FormsModule],template:`
<div class="container page"><div class="toolbar"><div><h1>Department Management</h1><p>Create and maintain departments used by employee accounts.</p></div></div>
<div class="grid grid-2"><div class="card"><h2>{{editingId?'Edit':'Add'}} Department</h2><div class="alert alert-error" *ngIf="error">{{error}}</div><div class="form-field"><label>Department name</label><input [(ngModel)]="name" placeholder="e.g. Engineering"></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" (click)="save()" [disabled]="saving">{{saving?'Saving...':'Save'}}</button><button class="btn btn-secondary" *ngIf="editingId" (click)="reset()">Cancel</button></div></div>
<div class="card"><div class="loading" *ngIf="loading">Loading...</div><div class="table-wrap" *ngIf="!loading"><table><thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody><tr *ngFor="let d of departments"><td>{{d.name}}</td><td class="actions"><button class="btn btn-secondary" (click)="edit(d)">Edit</button><button class="btn btn-danger" (click)="remove(d)">Delete</button></td></tr></tbody></table><div class="empty" *ngIf="!departments.length">No departments found.</div></div></div></div></div>`,styles:[]})
export class DepartmentManagementComponent implements OnInit {
 private readonly service=inject(DepartmentService);departments:Department[]=[];name='';editingId:number|null=null;loading=true;saving=false;error='';
 ngOnInit():void{this.load()}load():void{this.loading=true;this.service.getAll().subscribe({next:x=>{this.departments=x;this.loading=false},error:e=>{this.error=e?.error?.message??'Unable to load departments.';this.loading=false}})}
 save():void{const value=this.name.trim();if(!value){this.error='Department name is required.';return}this.saving=true;this.error='';const obs=this.editingId?this.service.update(this.editingId,value):this.service.create(value);obs.subscribe({next:()=>{this.saving=false;this.reset();this.load()},error:e=>{this.error=e?.error?.message??'Unable to save department.';this.saving=false}})}
 edit(d:Department):void{this.editingId=d.id;this.name=d.name;this.error=''}reset():void{this.editingId=null;this.name='';this.error=''}
 remove(d:Department):void{if(!confirm(`Delete ${d.name}? Departments with employees cannot be deleted.`))return;this.service.delete(d.id).subscribe({next:()=>this.load(),error:e=>this.error=e?.error?.message??'Unable to delete department.'})}
}
