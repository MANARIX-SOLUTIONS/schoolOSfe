import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-enrollment-flow-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './enrollment-flow-page.component.html',
  styleUrl: './enrollment-flow-page.component.scss',
})
export class EnrollmentFlowPageComponent {
  private readonly router = inject(Router);

  protected readonly phase = signal(0);
  protected readonly submitted = signal(false);

  protected student = {
    firstName: '',
    lastName: '',
    birthDate: '',
    level: 'CP',
  };

  protected guardian = {
    fullName: '',
    relation: 'Père',
    phone: '',
    email: '',
  };

  protected dossierComplete = false;

  protected next(): void {
    this.phase.update((p) => Math.min(p + 1, 2));
  }

  protected prev(): void {
    this.phase.update((p) => Math.max(p - 1, 0));
  }

  protected submitPhase0(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.next();
  }

  protected submitPhase1(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.next();
  }

  protected submitPhase2(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    window.setTimeout(() => {
      void this.router.navigate(['/app/students']);
    }, 900);
  }
}
