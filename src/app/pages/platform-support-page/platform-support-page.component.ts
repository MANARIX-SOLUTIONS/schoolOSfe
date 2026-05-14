import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-platform-support-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <span class="eyebrow-platform">Super Admin — vous</span>
      <h1>Support & SLA</h1>
      <p class="sub">
        File des tickets plateforme (intégrations, facturation SaaS, accès). À
        brancher sur Linear, Zendesk ou votre helpdesk via webhooks.
      </p>
      @if (tenantFocus(); as slug) {
        <p class="banner-focus banner-focus--below">
          Contexte tenant
          <strong class="mono">{{ slug }}</strong> — filtrage côté API à
          brancher.
        </p>
      }
      <div class="hero__kpis">
        <div class="mini-kpi">
          <span>Ouverts</span>
          <strong>{{ openCount }}</strong>
        </div>
        <div class="mini-kpi">
          <span>SLA respecté (7 j)</span>
          <strong class="ok">98 %</strong>
        </div>
        <div class="mini-kpi">
          <span>MTTR moyen</span>
          <strong>5,2 h</strong>
        </div>
      </div>
    </section>

    <div class="card card-pad table-wrap">
      <table class="table-app">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Sujet</th>
            <th scope="col">École</th>
            <th scope="col">Priorité</th>
            <th scope="col">Statut</th>
          </tr>
        </thead>
        <tbody>
          @for (t of tickets; track t.id) {
            <tr>
              <td class="mono">{{ t.id }}</td>
              <td>{{ t.subject }}</td>
              <td>{{ t.school }}</td>
              <td>
                <span [class]="'pill pill--' + t.priorityTone">{{
                  t.priority
                }}</span>
              </td>
              <td>
                <span [class]="'pill pill--' + t.statusTone">{{
                  t.status
                }}</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <footer class="foot card card-pad">
      <p>
        Escalade infra : voir
        <a routerLink="/app/platform/monitoring">Monitoring plateforme</a>
        et
        <a routerLink="/app/platform/health">Santé & journaux</a>.
      </p>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
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
      .hero__kpis {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .mini-kpi {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.65rem 0.85rem;
        border-radius: var(--radius-md);
        background: rgba(11, 122, 114, 0.06);
        min-width: 7rem;
      }
      .mini-kpi span {
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-text-muted);
      }
      .mini-kpi strong {
        font-size: 1.15rem;
        font-family: var(--font-display);
      }
      .mini-kpi strong.ok {
        color: var(--color-success);
      }
      .table-wrap {
        margin-top: 1rem;
        overflow-x: auto;
      }
      .table-app td {
        vertical-align: top;
      }
      .pill {
        display: inline-block;
        padding: 0.12rem 0.45rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 600;
      }
      .pill--high {
        background: rgba(239, 68, 68, 0.12);
        color: #b91c1c;
      }
      .pill--normal {
        background: rgba(100, 116, 139, 0.12);
        color: var(--color-text-muted);
      }
      .pill--low {
        background: rgba(16, 185, 129, 0.1);
        color: var(--color-success);
      }
      .pill--doing {
        background: rgba(59, 130, 246, 0.12);
        color: #1d4ed8;
      }
      .pill--wait {
        background: rgba(245, 158, 11, 0.15);
        color: var(--color-warning);
      }
      .pill--done {
        background: rgba(16, 185, 129, 0.12);
        color: var(--color-success);
      }
      .foot {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: var(--color-text-muted);
      }
      .foot p {
        margin: 0;
      }
      .foot a {
        font-weight: 600;
      }
    `,
  ],
})
export class PlatformSupportPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly tenantFocus = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get('t'))),
    { initialValue: null },
  );

  protected readonly openCount = 7;

  protected readonly tickets = [
    {
      id: 'SUP-2041',
      subject: 'Webhook Wave : signature invalide sur préprod',
      school: '— plateforme',
      priority: 'Haute',
      priorityTone: 'high' as const,
      status: 'En cours',
      statusTone: 'doing' as const,
    },
    {
      id: 'SUP-2038',
      subject: 'Ajouter siège secondaire (tenant fille)',
      school: 'Lycée Horizon',
      priority: 'Normale',
      priorityTone: 'normal' as const,
      status: 'En attente client',
      statusTone: 'wait' as const,
    },
    {
      id: 'SUP-2035',
      subject: 'Facture SaaS : montant TTC vs NINEA',
      school: 'Les Palmiers',
      priority: 'Normale',
      priorityTone: 'normal' as const,
      status: 'Résolu',
      statusTone: 'done' as const,
    },
    {
      id: 'SUP-2029',
      subject: 'Quota SMS relance impayés',
      school: 'École Sahel',
      priority: 'Basse',
      priorityTone: 'low' as const,
      status: 'En cours',
      statusTone: 'doing' as const,
    },
  ] as const;
}
