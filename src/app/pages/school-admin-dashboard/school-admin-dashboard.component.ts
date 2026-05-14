import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-school-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe],
  templateUrl: './school-admin-dashboard.component.html',
  styleUrl: './school-admin-dashboard.component.scss',
})
export class SchoolAdminDashboardComponent {
  protected readonly kpis = [
    {
      label: 'Encaissements (mois)',
      value: 12_450_000,
      delta: '+12 %',
      tone: 'up' as const,
      isMoney: true,
    },
    {
      label: 'Impayés en retard',
      value: 3_280_000,
      delta: '−4 familles vs semaine dernière',
      tone: 'warn' as const,
      isMoney: true,
    },
    {
      label: 'Inscriptions en cours',
      value: 42,
      delta: '8 dossiers à valider',
      tone: 'neutral' as const,
      isMoney: false,
    },
    {
      label: 'Messages parents non lus',
      value: 17,
      delta: 'Objectif SLA 24 h',
      tone: 'neutral' as const,
      isMoney: false,
    },
  ] as const;

  protected readonly alerts = [
    {
      title: 'Relance échéance T2',
      detail: '12 familles — rappel automatique demain 09:00',
      type: 'warn' as const,
    },
    {
      title: 'Wave — webhooks en file',
      detail: '3 paiements à réconcilier (idempotence contrôlée)',
      type: 'info' as const,
    },
  ] as const;

  protected readonly shortcuts = [
    { label: 'Nouvelle inscription', path: '/app/enrollment' },
    { label: 'Enregistrer un paiement', path: '/app/checkout' },
    { label: 'Exporter impayés', path: '/app/finance' },
    { label: 'Classes & niveaux', path: '/app/classes' },
    { label: 'Pédagogie (notes)', path: '/app/academic' },
    { label: 'Documents', path: '/app/documents' },
    { label: 'Rapports CSV', path: '/app/reports' },
  ] as const;
}
