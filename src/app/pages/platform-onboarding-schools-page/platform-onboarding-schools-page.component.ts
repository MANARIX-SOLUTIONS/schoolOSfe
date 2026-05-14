import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-platform-onboarding-schools-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <p class="eyebrow">Super Admin — vous</p>
      <h1>Onboarding des écoles</h1>
      <p class="sub">
        Pipeline commercial → technique : dossier, validation, provisionnement
        tenant et premier accès direction. Données de démo — brancher sur
        <code>schoolOSbe</code>.
      </p>
      <div class="hero__actions">
        <button
          type="button"
          class="btn btn-primary"
          (click)="startNewRequest()"
        >
          Nouvelle demande
        </button>
        <a routerLink="/app/platform/schools" class="btn btn-secondary"
          >Voir les établissements</a
        >
      </div>
    </section>

    @if (requestFlash(); as msg) {
      <p class="req-flash card card-pad" role="status">{{ msg }}</p>
    }

    <ol class="pipeline" aria-label="Étapes d’onboarding">
      @for (s of steps; track s.id) {
        <li class="pipeline__step card card-pad">
          <span class="pipeline__idx">{{ s.id }}</span>
          <div class="pipeline__body">
            <h2>{{ s.title }}</h2>
            <p>{{ s.detail }}</p>
            <p class="pipeline__meta">
              <span [class]="'pill pill--' + s.statusTone">{{ s.status }}</span>
              {{ s.sla }}
            </p>
          </div>
        </li>
      }
    </ol>

    <section class="card card-pad queue">
      <h2>Dossiers en cours</h2>
      <table class="mini-table">
        <thead>
          <tr>
            <th>École</th>
            <th>Contact</th>
            <th>Étape</th>
            <th>Depuis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Groupe Scolaire Baobab</td>
            <td>projet&#64;baobab-edu.sn</td>
            <td>Provisionnement DB</td>
            <td>2 j</td>
          </tr>
          <tr>
            <td>Centre Saint-Michel</td>
            <td>dsi&#64;csm.sn</td>
            <td>Validation KYC</td>
            <td>5 j</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .eyebrow {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-primary);
        margin: 0 0 0.5rem;
      }
      .hero h1 {
        font-size: 1.55rem;
        margin: 0 0 0.5rem;
      }
      .sub {
        margin: 0 0 1rem;
        color: var(--color-text-muted);
        max-width: 62ch;
        line-height: 1.5;
      }
      .sub code {
        font-size: 0.85em;
        padding: 0.05rem 0.3rem;
        border-radius: 4px;
        background: rgba(15, 23, 42, 0.06);
      }
      .hero__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .req-flash {
        margin-top: 1rem;
        border: 1px solid rgba(11, 122, 114, 0.28);
        background: rgba(11, 122, 114, 0.08);
        color: #065f56;
        font-size: 0.9375rem;
      }
      .pipeline {
        list-style: none;
        margin: 1.25rem 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .pipeline__step {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: start;
        margin: 0;
      }
      .pipeline__idx {
        width: 2rem;
        height: 2rem;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--color-primary), #0d9488);
        color: #fff;
        font-weight: 700;
        font-size: 0.9rem;
        display: grid;
        place-items: center;
      }
      .pipeline__body h2 {
        font-size: 1.05rem;
        margin: 0 0 0.35rem;
      }
      .pipeline__body p {
        margin: 0;
        font-size: 0.9375rem;
        color: var(--color-text-muted);
        line-height: 1.45;
      }
      .pipeline__meta {
        margin-top: 0.65rem !important;
        font-size: 0.8125rem !important;
        color: var(--color-text) !important;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      .pill {
        display: inline-block;
        padding: 0.12rem 0.5rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 600;
      }
      .pill--ok {
        background: rgba(16, 185, 129, 0.12);
        color: var(--color-success);
      }
      .pill--warn {
        background: rgba(245, 158, 11, 0.15);
        color: var(--color-warning);
      }
      .pill--muted {
        background: rgba(100, 116, 139, 0.12);
        color: var(--color-text-muted);
      }
      .queue {
        margin-top: 1.25rem;
      }
      .queue h2 {
        font-size: 1.1rem;
        margin: 0 0 1rem;
      }
      .mini-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }
      .mini-table th,
      .mini-table td {
        text-align: left;
        padding: 0.6rem 0.45rem;
        border-bottom: 1px solid var(--color-border);
      }
      .mini-table th {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-text-muted);
      }
    `,
  ],
})
export class PlatformOnboardingSchoolsPageComponent {
  protected readonly requestFlash = signal<string | null>(null);

  private requestFlashTimer: ReturnType<typeof window.setTimeout> | undefined;

  protected startNewRequest(): void {
    if (this.requestFlashTimer !== undefined) {
      window.clearTimeout(this.requestFlashTimer);
    }
    this.requestFlash.set(
      'Démo : une nouvelle demande d’onboarding serait créée côté API (workflow commercial).',
    );
    this.requestFlashTimer = window.setTimeout(() => {
      this.requestFlash.set(null);
      this.requestFlashTimer = undefined;
    }, 4000);
  }

  protected readonly steps = [
    {
      id: 1,
      title: 'Collecte & contrat',
      detail: 'Devis signé, NINEA / RCCM, coordonnées facturation plateforme.',
      status: 'En standard',
      statusTone: 'ok' as const,
      sla: 'Objectif 24 h ouvrées',
    },
    {
      id: 2,
      title: 'Provisionnement tenant',
      detail:
        'Schéma Postgres dédié ou schéma partagé + row-level security, bucket documents.',
      status: '2 jobs en file',
      statusTone: 'warn' as const,
      sla: 'Runbook Ansible / Terraform',
    },
    {
      id: 3,
      title: 'Premier administrateur',
      detail:
        'Invitation e-mail, MFA optionnelle, rôle « Admin établissement ».',
      status: 'Automatisé',
      statusTone: 'muted' as const,
      sla: 'Hook après étape 2',
    },
  ] as const;
}
