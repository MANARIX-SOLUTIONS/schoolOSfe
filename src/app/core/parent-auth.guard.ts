import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

function isSafeParentPath(url: string): boolean {
  const path = url.split(/[?#]/)[0] ?? url;
  if (!path.startsWith('/') || path.startsWith('//')) {
    return false;
  }
  if (path === '/parent' || path.startsWith('/parent/')) {
    return !path.startsWith('/parent/connexion');
  }
  return false;
}

function parentReturnUrl(router: Router): string {
  const nav = router.getCurrentNavigation();
  const fromNav = nav?.finalUrl?.toString() ?? nav?.extractedUrl?.toString();
  if (fromNav && isSafeParentPath(fromNav)) {
    return fromNav.startsWith('/') ? fromNav : `/${fromNav}`;
  }
  if (
    router.url.startsWith('/parent') &&
    !router.url.startsWith('/parent/connexion') &&
    isSafeParentPath(router.url)
  ) {
    return router.url;
  }
  return '/parent';
}

export const parentAuthGuard: CanMatchFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.ensureParentSessionRestored();
  if (auth.isParentAuthenticated()) {
    return true;
  }
  const returnUrl = parentReturnUrl(router);
  const tree = router.parseUrl('/parent/connexion');
  tree.queryParams = { returnUrl };
  return tree;
};
