import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FcfaPipe } from '../../core/fcfa.pipe';

type PayMethod = 'wave' | 'orange' | 'free' | 'card';

@Component({
  selector: 'app-payment-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe],
  templateUrl: './payment-checkout.component.html',
  styleUrl: './payment-checkout.component.scss',
})
export class PaymentCheckoutComponent {
  protected readonly amountDue = 450_000;
  protected readonly method = signal<PayMethod>('wave');

  protected cardName = '';
  protected cardNumber = '';
  protected cardExp = '';
  protected cardCvv = '';

  protected payerPhone = '';

  protected readonly paid = signal(false);
  protected readonly payError = signal<string | null>(null);

  protected pick(m: PayMethod): void {
    this.method.set(m);
    this.payError.set(null);
  }

  protected pay(f: NgForm): void {
    this.payError.set(null);
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }

    if (this.method() === 'card') {
      const cc = this.cardNumber.replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cc)) {
        this.payError.set('Numéro de carte invalide (13 à 19 chiffres).');
        return;
      }
    }

    this.paid.set(true);
    window.setTimeout(() => this.paid.set(false), 3500);
  }
}
