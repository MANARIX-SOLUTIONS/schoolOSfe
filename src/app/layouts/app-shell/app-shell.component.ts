import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { getSchoolNavGroups } from '../../core/school-nav.config';
import { SCHOOL_ROLE_SHORT } from '../../core/school-role.model';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly navOpen = signal(false);

  protected readonly navGroups = computed(() =>
    getSchoolNavGroups(this.auth.schoolRole()),
  );

  protected readonly topbarCrumbs = computed(() => {
    const role = this.auth.schoolRole();
    const short = SCHOOL_ROLE_SHORT[role];
    if (role === 'super-admin') {
      return {
        eyebrow: `${short} — vous`,
        title: 'Pilotage multi-écoles',
      } as const;
    }
    return {
      eyebrow: short,
      title: 'Lycée Horizon — Dakar',
    } as const;
  });

  protected readonly isSuperAdmin = computed(
    () => this.auth.schoolRole() === 'super-admin',
  );

  private readonly year = computed(() => new Date().getFullYear());

  protected get footerYear(): number {
    return this.year();
  }

  protected sessionLabel(): string | null {
    return this.auth.sessionLabel();
  }

  protected toggleNav(): void {
    this.navOpen.update((v) => !v);
  }

  protected closeNav(): void {
    this.navOpen.set(false);
  }

  protected signOut(): void {
    this.auth.signOut();
    void this.router.navigate(['/connexion']);
    this.closeNav();
  }
}
