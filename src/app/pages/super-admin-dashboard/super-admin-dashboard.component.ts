import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrl: './super-admin-dashboard.component.scss',
})
export class SuperAdminDashboardComponent {
  protected readonly kpis = [
    {
      label: 'Écoles actives',
      value: 24,
      delta: '+2 ce mois',
      tone: 'up' as const,
      isMoney: false,
    },
    {
      label: 'MRR (facturation plateforme)',
      value: 18_600_000,
      delta: '+5 % vs mois dernier',
      tone: 'up' as const,
      isMoney: true,
    },
    {
      label: 'Tickets support ouverts',
      value: 7,
      delta: 'SLA moyen 6 h',
      tone: 'neutral' as const,
      isMoney: false,
    },
    {
      label: 'Webhooks en erreur (24 h)',
      value: 2,
      delta: 'Wave : relancer les retries',
      tone: 'warn' as const,
      isMoney: false,
    },
  ] as const;

  protected readonly alerts = [
    {
      title: 'Essai expirant',
      detail: 'École Les Palmiers — fin d’essai dans 3 jours',
      type: 'warn' as const,
    },
    {
      title: 'Mise à jour système',
      detail: 'API facturation v2 — fenêtre 02:00–03:00 UTC',
      type: 'info' as const,
    },
  ] as const;

  protected readonly shortcuts = [
    { label: 'Onboarding écoles', path: '/app/platform/onboarding' },
    { label: 'Établissements', path: '/app/platform/schools' },
    { label: 'Fonctionnalités', path: '/app/platform/features' },
    { label: 'Monitoring plateforme', path: '/app/platform/monitoring' },
    { label: 'Facturation SaaS', path: '/app/platform/billing' },
    { label: 'Support & SLA', path: '/app/platform/support' },
    { label: 'Santé & journaux', path: '/app/platform/health' },
  ] as const;
}
