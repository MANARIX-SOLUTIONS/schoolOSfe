import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const STEPS = [
  'Profil établissement',
  'Abonnement & facturation',
  'Identité visuelle',
  'Invitation équipe',
] as const;

@Component({
  selector: 'app-onboarding-flow',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterLink],
  templateUrl: './onboarding-flow.component.html',
  styleUrl: './onboarding-flow.component.scss',
})
export class OnboardingFlowComponent {
  private readonly router = inject(Router);

  protected readonly step = signal(0);
  protected readonly steps = STEPS;
  protected readonly progress = computed(() => {
    const s = this.step();
    return Math.round((100 * (s + 1)) / STEPS.length);
  });

  /** Modèles formulaires (persistés en mémoire le temps du parcours). */
  protected profile = {
    legalName: '',
    ninea: '',
    city: '',
    adminPhone: '',
  };

  protected billingPlan: 'essential' | 'establishment' = 'essential';
  protected billingEmail = '';

  protected primaryColor = '#0d7a6f';
  protected accentColor = '#c27a1a';

  protected inviteEmails = '';

  protected next(): void {
    this.step.update((s) => Math.min(s + 1, STEPS.length - 1));
  }

  protected prev(): void {
    this.step.update((s) => Math.max(s - 1, 0));
  }

  protected submitStep0(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.next();
  }

  protected submitStep1(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.next();
  }

  protected submitStep2(_f: NgForm): void {
    this.next();
  }

  protected submitStep3(_f: NgForm): void {
    this.goDashboard();
  }

  protected goDashboard(): void {
    void this.router.navigate(['/app/dashboard']);
  }
}
