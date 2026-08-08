
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { LeaveRequest } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],

  template: `
    <div class="dashboard-container">

      <!-- Welcome Header -->
      <div class="dashboard-header">

        <div>
          <div class="welcome-label">EMPLOYEE PORTAL</div>

          <h1>Welcome back, {{ user?.name }}</h1>

          <p>
            Here's an overview of your leave activity.
          </p>
        </div>

        <a
          routerLink="/apply-leave"
          class="apply-button"
        >
          <span>+</span>
          Apply for Leave
        </a>

      </div>


      <!-- Statistics -->
      <div class="stats-grid">

        <div class="stat-card">
          <div class="stat-icon blue">▣</div>

          <div>
            <div class="stat-title">Total Leaves</div>
            <div class="stat-number">{{ leaves.length }}</div>
            <div class="stat-description">All requests</div>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon orange">◷</div>

          <div>
            <div class="stat-title">Pending</div>
            <div class="stat-number">{{ count('PENDING') }}</div>
            <div class="stat-description">Awaiting approval</div>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon green">✓</div>

          <div>
            <div class="stat-title">Approved</div>
            <div class="stat-number">{{ count('APPROVED') }}</div>
            <div class="stat-description">Approved requests</div>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon red">×</div>

          <div>
            <div class="stat-title">Rejected</div>
            <div class="stat-number">{{ count('REJECTED') }}</div>
            <div class="stat-description">Rejected requests</div>
          </div>
        </div>

      </div>


      <!-- Quick Actions -->
      <div class="section">

        <div class="section-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Manage your leave and account.</p>
          </div>
        </div>


        <div class="actions-grid">

          <a
            routerLink="/apply-leave"
            class="action-card"
          >
            <div class="action-icon blue">
              +
            </div>

            <div class="action-content">
              <h3>Apply for Leave</h3>
              <p>Submit a new leave request.</p>
            </div>

            <span class="arrow">→</span>
          </a>


          <a
            routerLink="/leave-history"
            class="action-card"
          >
            <div class="action-icon purple">
              ≡
            </div>

            <div class="action-content">
              <h3>Leave History</h3>
              <p>View and track your requests.</p>
            </div>

            <span class="arrow">→</span>
          </a>


          <a
            routerLink="/profile"
            class="action-card"
          >
            <div class="action-icon green">
              ◉
            </div>

            <div class="action-content">
              <h3>My Profile</h3>
              <p>View your account information.</p>
            </div>

            <span class="arrow">→</span>
          </a>

        </div>

      </div>


      <!-- Recent Requests -->
      <div class="section">

        <div class="section-header">

          <div>
            <h2>Recent Leave Requests</h2>
            <p>Your latest leave activity.</p>
          </div>

          <a
            routerLink="/leave-history"
            class="view-all"
          >
            View all →
          </a>

        </div>


        <div class="requests-card">

          <!-- Loading -->
          <div
            *ngIf="loading"
            class="loading-state"
          >
            <div class="spinner"></div>
            <p>Loading leave requests...</p>
          </div>


          <!-- Empty -->
          <div
            *ngIf="!loading && leaves.length === 0"
            class="empty-state"
          >
            <div class="empty-icon">▣</div>

            <h3>No leave requests yet</h3>

            <p>
              Your submitted leave requests will appear here.
            </p>

            <a
              routerLink="/apply-leave"
              class="empty-button"
            >
              Apply for Leave
            </a>
          </div>


          <!-- Requests Table -->
          <div
            class="table-wrapper"
            *ngIf="!loading && leaves.length"
          >

            <table>

              <thead>
                <tr>
                  <th>LEAVE TYPE</th>
                  <th>DATES</th>
                  <th>REASON</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                <tr
                  *ngFor="let l of leaves | slice:0:5"
                >

                  <td>
                    <div class="leave-type">
                      <span class="leave-dot"></span>
                      <strong>{{ l.leaveType }}</strong>
                    </div>
                  </td>

                  <td>
                    <div class="dates">
                      {{ l.startDate }}
                      <span>→</span>
                      {{ l.endDate }}
                    </div>
                  </td>

                  <td>
                    {{ l.reason || '—' }}
                  </td>

                  <td>

                    <span
                      class="status"
                      [ngClass]="'status-' + l.status.toLowerCase()"
                    >
                      <span class="status-dot"></span>
                      {{ l.status }}
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  `,

  styles: [`

    :host {
      display: block;
      min-height: calc(100vh - 72px);
      background: #f8fafc;
    }


    /* Main container */

    .dashboard-container {
      width: min(1380px, calc(100% - 48px));
      margin: auto;
      padding: 38px 0 60px;
    }


    /* Header */

    .dashboard-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      margin-bottom: 30px;
    }

    .welcome-label {
      margin-bottom: 8px;

      color: #155eef;

      font-size: 11px;
      font-weight: 800;

      letter-spacing: 1.2px;
    }

    .dashboard-header h1 {
      margin: 0;

      color: #101828;

      font-size: 30px;
      font-weight: 750;

      letter-spacing: -0.7px;
    }

    .dashboard-header p {
      margin: 8px 0 0;

      color: #667085;

      font-size: 14px;
    }


    /* Apply button */

    .apply-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      padding: 12px 18px;

      border-radius: 9px;

      background: #155eef;
      color: white;

      text-decoration: none;

      font-size: 13px;
      font-weight: 700;

      box-shadow: 0 4px 10px rgba(21, 94, 239, 0.18);

      transition: all .2s ease;
    }

    .apply-button:hover {
      background: #004eeb;
      transform: translateY(-1px);
    }

    .apply-button span {
      font-size: 18px;
      line-height: 1;
    }


    /* Statistics */

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      gap: 16px;

      margin-bottom: 36px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 15px;

      padding: 20px;

      background: white;

      border: 1px solid #eaecf0;
      border-radius: 12px;

      box-shadow: 0 1px 2px rgba(16, 24, 40, .03);

      transition: all .2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);

      box-shadow: 0 6px 18px rgba(16, 24, 40, .07);
    }

    .stat-icon {
      width: 45px;
      height: 45px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;

      border-radius: 11px;

      font-size: 19px;
      font-weight: 700;
    }

    .stat-icon.blue {
      background: #eff4ff;
      color: #155eef;
    }

    .stat-icon.orange {
      background: #fffaeb;
      color: #b54708;
    }

    .stat-icon.green {
      background: #ecfdf3;
      color: #027a48;
    }

    .stat-icon.red {
      background: #fef3f2;
      color: #b42318;
    }

    .stat-title {
      color: #667085;

      font-size: 12px;
      font-weight: 600;
    }

    .stat-number {
      margin: 4px 0;

      color: #101828;

      font-size: 26px;
      font-weight: 750;

      line-height: 1;
    }

    .stat-description {
      color: #98a2b3;

      font-size: 10px;
    }


    /* Sections */

    .section {
      margin-bottom: 34px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 14px;
    }

    .section-header h2 {
      margin: 0;

      color: #101828;

      font-size: 17px;
      font-weight: 750;
    }

    .section-header p {
      margin: 4px 0 0;

      color: #667085;

      font-size: 12px;
    }

    .view-all {
      color: #155eef;

      font-size: 12px;
      font-weight: 700;

      text-decoration: none;
    }


    /* Actions */

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      gap: 14px;
    }

    .action-card {
      display: flex;
      align-items: center;

      gap: 13px;

      padding: 17px;

      background: white;

      border: 1px solid #eaecf0;
      border-radius: 11px;

      text-decoration: none;

      transition: all .2s ease;
    }

    .action-card:hover {
      border-color: #b2ccff;

      transform: translateY(-2px);

      box-shadow: 0 6px 16px rgba(16, 24, 40, .06);
    }

    .action-icon {
      width: 42px;
      height: 42px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;

      border-radius: 10px;

      font-size: 20px;
      font-weight: 700;
    }

    .action-icon.blue {
      background: #eff4ff;
      color: #155eef;
    }

    .action-icon.purple {
      background: #f4f3ff;
      color: #6938ef;
    }

    .action-icon.green {
      background: #ecfdf3;
      color: #027a48;
    }

    .action-content {
      flex: 1;
    }

    .action-content h3 {
      margin: 0;

      color: #101828;

      font-size: 13px;
      font-weight: 700;
    }

    .action-content p {
      margin: 4px 0 0;

      color: #667085;

      font-size: 11px;
    }

    .arrow {
      color: #98a2b3;

      font-size: 17px;
    }


    /* Recent requests */

    .requests-card {
      overflow: hidden;

      background: white;

      border: 1px solid #eaecf0;
      border-radius: 12px;

      box-shadow: 0 1px 2px rgba(16, 24, 40, .03);
    }


    /* Table */

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;

      min-width: 700px;

      border-collapse: collapse;
    }

    th {
      padding: 13px 18px;

      background: #f9fafb;

      border-bottom: 1px solid #eaecf0;

      color: #667085;

      font-size: 10px;
      font-weight: 800;

      letter-spacing: .05em;

      text-align: left;
    }

    td {
      padding: 16px 18px;

      border-bottom: 1px solid #f2f4f7;

      color: #475467;

      font-size: 12px;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover {
      background: #fcfcfd;
    }


    /* Leave type */

    .leave-type {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .leave-type strong {
      color: #101828;
    }

    .leave-dot {
      width: 7px;
      height: 7px;

      border-radius: 50%;

      background: #155eef;
    }


    /* Dates */

    .dates {
      display: flex;
      align-items: center;

      gap: 7px;

      white-space: nowrap;
    }

    .dates span {
      color: #98a2b3;
    }


    /* Status */

    .status {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      padding: 5px 9px;

      border-radius: 999px;

      font-size: 10px;
      font-weight: 700;
    }

    .status-dot {
      width: 5px;
      height: 5px;

      border-radius: 50%;
    }

    .status-pending {
      background: #fffaeb;
      color: #b54708;
    }

    .status-pending .status-dot {
      background: #f79009;
    }

    .status-approved {
      background: #ecfdf3;
      color: #027a48;
    }

    .status-approved .status-dot {
      background: #12b76a;
    }

    .status-rejected {
      background: #fef3f2;
      color: #b42318;
    }

    .status-rejected .status-dot {
      background: #f04438;
    }

    .status-cancelled {
      background: #f2f4f7;
      color: #475467;
    }

    .status-cancelled .status-dot {
      background: #667085;
    }


    /* Loading */

    .loading-state {
      min-height: 220px;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;

      color: #667085;

      font-size: 12px;
    }

    .spinner {
      width: 26px;
      height: 26px;

      margin-bottom: 10px;

      border: 3px solid #eaecf0;
      border-top-color: #155eef;

      border-radius: 50%;

      animation: spin .8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }


    /* Empty */

    .empty-state {
      min-height: 260px;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;

      text-align: center;
    }

    .empty-icon {
      width: 48px;
      height: 48px;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 10px;

      border-radius: 50%;

      background: #f2f4f7;

      color: #667085;

      font-size: 18px;
    }

    .empty-state h3 {
      margin: 0;

      color: #344054;

      font-size: 14px;
    }

    .empty-state p {
      margin: 5px 0;

      color: #98a2b3;

      font-size: 11px;
    }

    .empty-button {
      margin-top: 9px;

      color: #155eef;

      font-size: 11px;
      font-weight: 700;

      text-decoration: none;
    }


    /* Responsive */

    @media (max-width: 1100px) {

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }

    }


    @media (max-width: 700px) {

      .dashboard-container {
        width: calc(100% - 24px);

        padding-top: 25px;
      }

      .dashboard-header {
        flex-direction: column;

        align-items: stretch;
      }

      .dashboard-header h1 {
        font-size: 25px;
      }

      .apply-button {
        justify-content: center;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

    }

  `]
})
export class DashboardComponent implements OnInit {

  private readonly auth = inject(AuthService);

  private readonly leaveService = inject(LeaveService);

  user = this.auth.getUser();

  leaves: LeaveRequest[] = [];

  loading = true;


  ngOnInit(): void {

    if (this.user) {

      this.leaveService
        .getByEmployee(this.user.id)
        .subscribe({

          next: x => {
            this.leaves = x;
            this.loading = false;
          },

          error: () => {
            this.loading = false;
          }

        });

    }

  }


  count(status: LeaveRequest['status']): number {

    return this.leaves.filter(
      x => x.status === status
    ).length;

  }

}

