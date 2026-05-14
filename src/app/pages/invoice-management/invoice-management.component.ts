import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FcfaPipe } from '../../core/fcfa.pipe';

interface InvoiceRow {
  readonly ref: string;
  readonly family: string;
  readonly issued: string;
  readonly due: string;
  readonly amount: number;
  readonly state: 'Payée' | 'En attente' | 'En retard';
}

@Component({
  selector: 'app-invoice-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe],
  templateUrl: './invoice-management.component.html',
  styleUrl: './invoice-management.component.scss',
})
export class InvoiceManagementComponent {
  /** 0 Factures — 1 Échéanciers & pénalités. */
  protected readonly invoiceMainTab = signal(0);

  protected readonly invoiceToast = signal<string | null>(null);

  protected pickInvoiceTab(index: number): void {
    this.invoiceMainTab.set(index);
  }

  protected downloadInvoicePdf(row: InvoiceRow): void {
    this.invoiceToast.set(
      `PDF ${row.ref} — ${row.family} (génération démo, fichier fictif).`,
    );
    window.setTimeout(() => this.invoiceToast.set(null), 4000);
  }

  protected readonly rows: InvoiceRow[] = [
    {
      ref: 'INV-2026-0142',
      family: 'Famille Diop',
      issued: '02/05/2026',
      due: '15/05/2026',
      amount: 450_000,
      state: 'En attente',
    },
    {
      ref: 'INV-2026-0138',
      family: 'Famille Ndiaye',
      issued: '28/04/2026',
      due: '05/05/2026',
      amount: 450_000,
      state: 'Payée',
    },
    {
      ref: 'INV-2026-0116',
      family: 'Famille Sarr',
      issued: '10/03/2026',
      due: '25/03/2026',
      amount: 380_000,
      state: 'En retard',
    },
  ];
}
