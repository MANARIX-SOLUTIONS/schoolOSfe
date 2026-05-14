import { Routes } from '@angular/router';
import { parentAuthGuard } from './core/parent-auth.guard';
import { schoolAuthGuard } from './core/school-auth.guard';
import { roleCanMatch, superAdminGuard } from './core/role-route.guard';
import type { SchoolRole } from './core/school-role.model';

/** Direction — inscriptions, structure, services (pas enseignant·e ni compta). */
const schoolAdminOnly: readonly SchoolRole[] = ['school-admin', 'super-admin'];

/** Pédagogie & emploi du temps — direction + enseignant·e. */
const teachingStaff: readonly SchoolRole[] = [
  'school-admin',
  'super-admin',
  'teacher',
];

/** Trésorerie / facturation — pas d’accès enseignant·e (URL directes incluses). */
const financeTeam: readonly SchoolRole[] = [
  'school-admin',
  'super-admin',
  'accountant',
];

/** Rapports & paramètres établissement — pas enseignant·e. */
const adminBackOffice: readonly SchoolRole[] = [
  'school-admin',
  'super-admin',
  'accountant',
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent,
      ),
  },
  {
    path: 'connexion',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./pages/onboarding-flow/onboarding-flow.component').then(
        (m) => m.OnboardingFlowComponent,
      ),
  },
  {
    path: 'parent',
    loadComponent: () =>
      import('./layouts/parent-layout/parent-layout.component').then(
        (m) => m.ParentLayoutComponent,
      ),
    children: [
      {
        path: 'connexion',
        loadComponent: () =>
          import('./pages/parent-login-page/parent-login-page.component').then(
            (m) => m.ParentLoginPageComponent,
          ),
      },
      {
        path: 'paiement',
        canMatch: [parentAuthGuard],
        loadComponent: () =>
          import('./pages/parent-payment-page/parent-payment-page.component').then(
            (m) => m.ParentPaymentPageComponent,
          ),
      },
      {
        path: '',
        canMatch: [parentAuthGuard],
        loadComponent: () =>
          import('./pages/parent-portal/parent-portal.component').then(
            (m) => m.ParentPortalComponent,
          ),
      },
    ],
  },
  {
    path: 'app',
    canMatch: [schoolAuthGuard],
    loadComponent: () =>
      import('./layouts/app-shell/app-shell.component').then(
        (m) => m.AppShellComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/school-dashboard/school-dashboard.component').then(
            (m) => m.SchoolDashboardComponent,
          ),
      },
      {
        path: 'platform/schools',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-schools-page/platform-schools-page.component').then(
            (m) => m.PlatformSchoolsPageComponent,
          ),
      },
      {
        path: 'platform/billing',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-billing-page/platform-billing-page.component').then(
            (m) => m.PlatformBillingPageComponent,
          ),
      },
      {
        path: 'platform/health',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-health-page/platform-health-page.component').then(
            (m) => m.PlatformHealthPageComponent,
          ),
      },
      {
        path: 'platform/onboarding',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-onboarding-schools-page/platform-onboarding-schools-page.component').then(
            (m) => m.PlatformOnboardingSchoolsPageComponent,
          ),
      },
      {
        path: 'platform/monitoring',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-monitoring-page/platform-monitoring-page.component').then(
            (m) => m.PlatformMonitoringPageComponent,
          ),
      },
      {
        path: 'platform/support',
        canMatch: [superAdminGuard],
        loadComponent: () =>
          import('./pages/platform-support-page/platform-support-page.component').then(
            (m) => m.PlatformSupportPageComponent,
          ),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/students-page/students-page.component').then(
            (m) => m.StudentsPageComponent,
          ),
      },
      {
        path: 'student-cards',
        canMatch: [roleCanMatch(teachingStaff)],
        loadComponent: () =>
          import('./pages/student-cards-page/student-cards-page.component').then(
            (m) => m.StudentCardsPageComponent,
          ),
      },
      {
        path: 'enrollment',
        canMatch: [roleCanMatch(schoolAdminOnly)],
        loadComponent: () =>
          import('./pages/enrollment-flow-page/enrollment-flow-page.component').then(
            (m) => m.EnrollmentFlowPageComponent,
          ),
      },
      {
        path: 'checkout',
        canMatch: [roleCanMatch(financeTeam)],
        loadComponent: () =>
          import('./pages/payment-checkout/payment-checkout.component').then(
            (m) => m.PaymentCheckoutComponent,
          ),
      },
      {
        path: 'invoices',
        canMatch: [roleCanMatch(financeTeam)],
        loadComponent: () =>
          import('./pages/invoice-management/invoice-management.component').then(
            (m) => m.InvoiceManagementComponent,
          ),
      },
      {
        path: 'finance',
        canMatch: [roleCanMatch(financeTeam)],
        loadComponent: () =>
          import('./pages/financial-dashboard/financial-dashboard.component').then(
            (m) => m.FinancialDashboardComponent,
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications-center/notifications-center.component').then(
            (m) => m.NotificationsCenterComponent,
          ),
      },
      {
        path: 'classes',
        canMatch: [roleCanMatch(schoolAdminOnly)],
        loadComponent: () =>
          import('./pages/classes-page/classes-page.component').then(
            (m) => m.ClassesPageComponent,
          ),
      },
      {
        path: 'teachers',
        canMatch: [roleCanMatch(schoolAdminOnly)],
        loadComponent: () =>
          import('./pages/teachers-page/teachers-page.component').then(
            (m) => m.TeachersPageComponent,
          ),
      },
      {
        path: 'timetable',
        canMatch: [roleCanMatch(teachingStaff)],
        loadComponent: () =>
          import('./pages/timetable-page/timetable-page.component').then(
            (m) => m.TimetablePageComponent,
          ),
      },
      {
        path: 'academic',
        canMatch: [roleCanMatch(teachingStaff)],
        loadComponent: () =>
          import('./pages/academic-hub-page/academic-hub-page.component').then(
            (m) => m.AcademicHubPageComponent,
          ),
      },
      {
        path: 'transport',
        canMatch: [roleCanMatch(schoolAdminOnly)],
        loadComponent: () =>
          import('./pages/transport-page/transport-page.component').then(
            (m) => m.TransportPageComponent,
          ),
      },
      {
        path: 'cantine',
        canMatch: [roleCanMatch(schoolAdminOnly)],
        loadComponent: () =>
          import('./pages/canteen-page/canteen-page.component').then(
            (m) => m.CanteenPageComponent,
          ),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./pages/documents-page/documents-page.component').then(
            (m) => m.DocumentsPageComponent,
          ),
      },
      {
        path: 'reports',
        canMatch: [roleCanMatch(adminBackOffice)],
        loadComponent: () =>
          import('./pages/reports-page/reports-page.component').then(
            (m) => m.ReportsPageComponent,
          ),
      },
      {
        path: 'settings',
        canMatch: [roleCanMatch(adminBackOffice)],
        loadComponent: () =>
          import('./pages/settings-page/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
