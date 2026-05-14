import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

function isSafeSchoolPath(url: string): boolean {
  const path = url.split(/[?#]/)[0] ?? url;
  if (!path.startsWith('/') || path.startsWith('//')) {
    return false;
  }
  return path === '/app' || path.startsWith('/app/');
}

function schoolReturnUrl(router: Router): string {
  const nav = router.getCurrentNavigation();
  const fromNav =
    nav?.finalUrl?.toString() ??
    nav?.extractedUrl?.toString() ??
    nav?.initialUrl?.toString();
  if (
    fromNav &&
    fromNav !== '/connexion' &&
    !fromNav.startsWith('/connexion?') &&
    isSafeSchoolPath(fromNav)
  ) {
    return fromNav.startsWith('/') ? fromNav : `/${fromNav}`;
  }
  const path = router.url.split(/[?#]/)[0] ?? router.url;
  if (
    path &&
    path !== '/' &&
    !path.startsWith('/connexion') &&
    isSafeSchoolPath(path)
  ) {
    return path;
  }
  return '/app/dashboard';
}

export const schoolAuthGuard: CanMatchFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.ensureSchoolSessionRestored();
  if (auth.isSchoolAuthenticated()) {
    return true;
  }
  const returnUrl = schoolReturnUrl(router);
  const tree = router.parseUrl('/connexion');
  tree.queryParams = { returnUrl };
  return tree;
};
