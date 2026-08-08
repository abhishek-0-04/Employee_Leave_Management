import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-profile', standalone: true, imports: [CommonModule], template: `
  <div class="container page"><div class="toolbar"><div><h1>My Profile</h1><p>Your account information.</p></div></div><div class="card profile"><div class="avatar">{{ user?.name?.charAt(0) }}</div><div class="details"><div><span>Name</span><strong>{{ user?.name }}</strong></div><div><span>Email</span><strong>{{ user?.email }}</strong></div><div><span>Department</span><strong>{{ user?.departmentName }}</strong></div><div><span>Role</span><strong>{{ user?.role }}</strong></div></div></div></div>
  `, styles: [`.profile{display:flex;gap:28px;align-items:center;max-width:760px}.avatar{width:90px;height:90px;border-radius:50%;display:grid;place-items:center;background:#dbeafe;color:#1d4ed8;font-size:2rem;font-weight:800}.details{display:grid;grid-template-columns:1fr 1fr;gap:18px;flex:1}.details div{display:flex;flex-direction:column;gap:5px}.details span{color:#667085;font-size:.82rem}.details strong{font-size:1rem}@media(max-width:600px){.profile{align-items:flex-start;flex-direction:column}.details{grid-template-columns:1fr;width:100%}}`] })
export class ProfileComponent { readonly user = inject(AuthService).getUser(); }
