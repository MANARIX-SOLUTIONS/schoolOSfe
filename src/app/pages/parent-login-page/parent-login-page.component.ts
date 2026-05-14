import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-parent-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterLink],
  templateUrl: './parent-login-page.component.html',
  styleUrl: './parent-login-page.component.scss',
})
export class ParentLoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected phone = '+221 77 123 45 67';
  protected otp = '';
  protected busy = false;

  private resolveReturnUrl(raw: string | null): string {
    if (!raw) {
      return '/parent';
    }
    const path = raw.split(/[?#]/)[0] ?? '';
    if (this.isSafeParentReturnUrl(path)) {
      return path;
    }
    return '/parent';
  }

  private isSafeParentReturnUrl(url: string): boolean {
    if (!url.startsWith('/') || url.startsWith('//')) {
      return false;
    }
    if (url === '/parent' || url.startsWith('/parent/')) {
      return !url.startsWith('/parent/connexion');
    }
    return false;
  }

  protected submit(): void {
    this.busy = true;
    window.setTimeout(() => {
      const label = this.phone.replace(/\s/g, '') || 'Famille';
      this.auth.startParentDemoSession(`Famille ${label.slice(-4)}`);
      const returnUrl = this.resolveReturnUrl(
        this.route.snapshot.queryParamMap.get('returnUrl'),
      );
      void this.router.navigateByUrl(returnUrl);
      this.busy = false;
    }, 400);
  }

  protected skipLogin(): void {
    this.auth.startParentDemoSession('Famille démo');
    const returnUrl = this.resolveReturnUrl(
      this.route.snapshot.queryParamMap.get('returnUrl'),
    );
    void this.router.navigateByUrl(returnUrl);
  }
}
