import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-accountant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe],
  templateUrl: './accountant-dashboard.component.html',
  styleUrl: './accountant-dashboard.component.scss',
})
export class AccountantDashboardComponent {
  protected readonly kpis = [
    {
      label: 'Encaissements (semaine)',
      value: 4_120_000,
      delta: '+8 %',
      tone: 'up' as const,
      isMoney: true,
    },
    {
      label: 'Impayés > 30 jours',
      value: 1_890_000,
      delta: '9 familles',
      tone: 'warn' as const,
      isMoney: true,
    },
    {
      label: 'Factures en brouillon',
      value: 14,
      delta: 'À valider direction',
      tone: 'neutral' as const,
      isMoney: false,
    },
    {
      label: 'Rapprochements Wave en attente',
      value: 6,
      delta: 'Import CSV / idempotence',
      tone: 'neutral' as const,
      isMoney: false,
    },
  ] as const;

  protected readonly alerts = [
    {
      title: 'Échéance salaire — virement',
      detail: 'Prévoir libellé Wave pour traçabilité',
      type: 'info' as const,
    },
    {
      title: 'TVA / export comptable',
      detail: 'Export mensuel prêt — colonnes FCFA + références',
      type: 'warn' as const,
    },
  ] as const;

  protected readonly shortcuts = [
    { label: 'Finances & trésorerie', path: '/app/finance' },
    { label: 'Factures & échéanciers', path: '/app/invoices' },
    { label: 'Caisse (Wave / OM)', path: '/app/checkout' },
    { label: 'Rapports & exports CSV', path: '/app/reports' },
  ] as const;
}
