import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import {
  DEFAULT_SCHOOL_ROLE,
  SCHOOL_ROLE_LABELS,
  type SchoolRole,
} from '../../core/school-role.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected email = 'direction@lycee-horizon.sn';
  protected password = '';
  protected busy = false;
  /** Rôle utilisé pour la démo (connexion réelle à brancher sur les claims JWT). */
  protected demoRole: SchoolRole = DEFAULT_SCHOOL_ROLE;

  protected readonly roleLabels = SCHOOL_ROLE_LABELS;
  protected readonly roleOptions: readonly SchoolRole[] = [
    'super-admin',
    'school-admin',
    'accountant',
    'teacher',
  ];

  private resolveReturnUrl(raw: string | null): string {
    if (!raw) {
      return '/app/dashboard';
    }
    const path = raw.split(/[?#]/)[0] ?? '';
    if (this.isSafeInternalAppUrl(path)) {
      return path;
    }
    return '/app/dashboard';
  }

  /** Limite les returnUrl internes (évite /apple, //host, etc.). */
  private isSafeInternalAppUrl(url: string): boolean {
    if (!url.startsWith('/') || url.startsWith('//')) {
      return false;
    }
    return url === '/app' || url.startsWith('/app/');
  }

  protected submit(): void {
    this.busy = true;
    window.setTimeout(() => {
      const label = this.email.includes('@')
        ? this.email.split('@')[0]!.replace(/\./g, ' ')
        : 'Administrateur';
      this.auth.startDemoSession(
        label.replace(/\b\w/g, (c) => c.toUpperCase()),
        this.demoRole,
      );
      const returnUrl = this.resolveReturnUrl(
        this.route.snapshot.queryParamMap.get('returnUrl'),
      );
      void this.router.navigateByUrl(returnUrl);
      this.busy = false;
    }, 400);
  }

  protected skipLogin(): void {
    this.auth.startDemoSession('Mode démo', this.demoRole);
    const returnUrl = this.resolveReturnUrl(
      this.route.snapshot.queryParamMap.get('returnUrl'),
    );
    void this.router.navigateByUrl(returnUrl);
  }
}
