import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-parent-payment-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterLink, FcfaPipe],
  templateUrl: './parent-payment-page.component.html',
  styleUrl: './parent-payment-page.component.scss',
})
export class ParentPaymentPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly amountDue = 450_000;

  protected payerPhone = '';

  protected readonly busy = signal(false);
  protected readonly done = signal(false);

  protected familyGreeting(): string {
    return this.auth.parentSessionLabel() ?? 'Famille';
  }

  protected submit(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    window.setTimeout(() => {
      this.busy.set(false);
      this.done.set(true);
    }, 500);
  }
}
