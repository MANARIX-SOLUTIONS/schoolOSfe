import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import type { SchoolRole } from './school-role.model';

export const superAdminGuard: CanMatchFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.ensureSchoolSessionRestored();
  if (auth.schoolRole() === 'super-admin') {
    return true;
  }
  return router.parseUrl('/app/dashboard');
};

export function roleCanMatch(allowed: readonly SchoolRole[]): CanMatchFn {
  return (): boolean | UrlTree => {
    const auth = inject(AuthService);
    const router = inject(Router);
    auth.ensureSchoolSessionRestored();
    const r = auth.schoolRole();
    if (allowed.includes(r)) {
      return true;
    }
    return router.parseUrl('/app/dashboard');
  };
}
