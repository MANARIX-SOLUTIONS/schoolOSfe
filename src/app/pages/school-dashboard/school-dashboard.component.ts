import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AccountantDashboardComponent } from '../accountant-dashboard/accountant-dashboard.component';
import { SchoolAdminDashboardComponent } from '../school-admin-dashboard/school-admin-dashboard.component';
import { SuperAdminDashboardComponent } from '../super-admin-dashboard/super-admin-dashboard.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';

@Component({
  selector: 'app-school-dashboard',
  standalone: true,
  imports: [
    SchoolAdminDashboardComponent,
    SuperAdminDashboardComponent,
    AccountantDashboardComponent,
    TeacherDashboardComponent,
  ],
  template: `
    @switch (role()) {
      @case ('super-admin') {
        <app-super-admin-dashboard />
      }
      @case ('accountant') {
        <app-accountant-dashboard />
      }
      @case ('teacher') {
        <app-teacher-dashboard />
      }
      @default {
        <app-school-admin-dashboard />
      }
    }
  `,
})
export class SchoolDashboardComponent {
  private readonly auth = inject(AuthService);
  protected readonly role = computed(() => this.auth.schoolRole());
}
