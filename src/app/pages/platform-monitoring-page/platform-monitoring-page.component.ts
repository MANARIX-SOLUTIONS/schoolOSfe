import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-platform-monitoring-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <p class="eyebrow">Super Admin — vous</p>
      <h1>Monitoring plateforme</h1>
      <p class="sub">
        Vue consolidée des SLO, files métiers et intégrations paiement. Passez
        en revue les journaux détaillés depuis Santé & journaux.
      </p>
      <a routerLink="/app/platform/health" class="btn btn-secondary"
        >Santé & journaux</a
      >
    </section>

    <div class="grid">
      @for (m of metrics; track m.label) {
        <article class="card card-pad metric">
          <span class="metric__label">{{ m.label }}</span>
          <strong [class]="'metric__value metric__value--' + m.tone">{{
            m.value
          }}</strong>
          <span class="metric__hint">{{ m.hint }}</span>
        </article>
      }
    </div>

    <section class="card card-pad incidents">
      <h2>Incidents & files (24 h)</h2>
      <ul class="incident-list">
        <li>
          <span class="dot dot--ok"></span>
          <div>
            <strong>API REST</strong>
            <span>Disponibilité 99,95 % — p95 118 ms</span>
          </div>
        </li>
        <li>
          <span class="dot dot--warn"></span>
          <div>
            <strong>Webhooks Wave</strong>
            <span>2 dlvr en retry (idempotence OK)</span>
          </div>
        </li>
        <li>
          <span class="dot dot--ok"></span>
          <div>
            <strong>Workers export CSV</strong>
            <span>File 0 — dernier job 12 min</span>
          </div>
        </li>
      </ul>
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
        max-width: 60ch;
        line-height: 1.5;
      }
      .grid {
        display: grid;
        gap: 0.85rem;
        margin-top: 1.15rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 640px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 960px) {
        .grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .metric {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-height: 5.5rem;
      }
      .metric__label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .metric__value {
        font-size: 1.35rem;
        font-family: var(--font-display);
      }
      .metric__value--ok {
        color: var(--color-success);
      }
      .metric__value--warn {
        color: var(--color-warning);
      }
      .metric__value--neutral {
        color: var(--color-text);
      }
      .metric__hint {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
      .incidents {
        margin-top: 1.15rem;
      }
      .incidents h2 {
        font-size: 1.05rem;
        margin: 0 0 0.85rem;
      }
      .incident-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
      }
      .incident-list li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.75rem;
        align-items: flex-start;
        font-size: 0.92rem;
      }
      .incident-list strong {
        display: block;
        margin-bottom: 0.15rem;
      }
      .incident-list span:last-child {
        color: var(--color-text-muted);
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        margin-top: 0.35rem;
      }
      .dot--ok {
        background: var(--color-success);
      }
      .dot--warn {
        background: var(--color-warning);
      }
    `,
  ],
})
export class PlatformMonitoringPageComponent {
  protected readonly metrics = [
    {
      label: 'Uptime API (30 j)',
      value: '99,96 %',
      tone: 'ok' as const,
      hint: 'Objectif 99,9 %',
    },
    {
      label: 'Erreurs 5xx / min',
      value: '0,02',
      tone: 'ok' as const,
      hint: 'Seuil alerte 1',
    },
    {
      label: 'Tenants actifs',
      value: '24',
      tone: 'neutral' as const,
      hint: '+2 en onboarding',
    },
    {
      label: 'Jobs en retard',
      value: '1',
      tone: 'warn' as const,
      hint: 'Export bilan mensuel',
    },
  ] as const;
}
