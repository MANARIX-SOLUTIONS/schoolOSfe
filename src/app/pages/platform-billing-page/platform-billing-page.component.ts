import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-platform-billing-page',
  standalone: true,
  imports: [FcfaPipe, RouterLink],
  template: `
    <section class="hero card card-pad">
      <span class="eyebrow-platform">Super Admin — vous</span>
      <h1>Facturation SaaS</h1>
      <p class="sub">
        Abonnements SchoolOS pour les établissements : plans Standard / Pro,
        facturation mensuelle ou annuelle en FCFA, exports comptables SN.
      </p>
      @if (tenantFocus(); as slug) {
        <p class="banner-focus">
          Focalisation tenant :
          <strong class="mono">{{ slug }}</strong>
          — ligne mise en évidence ci-dessous.
        </p>
      }
    </section>

    <div class="summary card card-pad">
      <h2>Indicateurs</h2>
      <ul class="list">
        <li>
          <span>MRR (mensuel récurrent)</span>
          <strong>{{ 18600000 | fcfa }}</strong>
        </li>
        <li>
          <span>ARR estimé</span>
          <strong>{{ 223200000 | fcfa }}</strong>
        </li>
        <li>
          <span>Factures impayées (SaaS)</span>
          <strong>1 · {{ 2450000 | fcfa }}</strong>
        </li>
        <li>
          <span>TVA & mentions</span>
          <strong>Export SN — NINEA / RCCM</strong>
        </li>
      </ul>
    </div>

    <div class="card card-pad table-wrap">
      <h2>Facturation par tenant</h2>
      <table class="table-app">
        <thead>
          <tr>
            <th scope="col">École</th>
            <th scope="col">Plan</th>
            <th scope="col">Cycle</th>
            <th scope="col">Montant</th>
            <th scope="col">Prochaine facture</th>
          </tr>
        </thead>
        <tbody>
          @for (row of tenantRows; track row.slug) {
            <tr [class.row--focus]="tenantFocus() === row.slug">
              <td>{{ row.school }}</td>
              <td>{{ row.plan }}</td>
              <td>{{ row.cycle }}</td>
              <td>{{ row.amount | fcfa }}</td>
              <td>{{ row.next }}</td>
            </tr>
          }
        </tbody>
      </table>
      <p class="hint">
        Relier à Stripe / Wave Business ou facture manuelle selon votre process.
        Voir aussi
        <a routerLink="/app/platform/support">Support</a> pour litiges.
      </p>
    </div>
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
        margin: 0;
        color: var(--color-text-muted);
        max-width: 62ch;
        line-height: 1.5;
      }
      .summary {
        margin-top: 1rem;
      }
      .summary h2 {
        font-size: 1.05rem;
        margin: 0 0 0.75rem;
      }
      .list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .list li {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        padding: 0.7rem 0;
        border-bottom: 1px solid var(--color-border);
        font-size: 0.9375rem;
      }
      .list li:last-child {
        border-bottom: none;
      }
      .list span {
        color: var(--color-text-muted);
      }
      .table-wrap {
        margin-top: 1rem;
        overflow-x: auto;
      }
      .table-wrap h2 {
        font-size: 1.05rem;
        margin: 0 0 0.85rem;
      }
      .hint {
        margin: 1rem 0 0;
        font-size: 0.875rem;
        color: var(--color-text-muted);
      }
      .hint a {
        font-weight: 600;
      }
    `,
  ],
})
export class PlatformBillingPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly tenantFocus = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get('t'))),
    { initialValue: null },
  );

  protected readonly tenantRows = [
    {
      slug: 'lycee-horizon',
      school: 'Lycée Horizon',
      plan: 'Pro',
      cycle: 'Mensuel',
      amount: 950_000,
      next: '15 mai 2026',
    },
    {
      slug: 'les-palmiers',
      school: 'Les Palmiers',
      plan: 'Standard',
      cycle: 'Annuel',
      amount: 4_200_000,
      next: '1er juin 2026',
    },
    {
      slug: 'ecole-sahel',
      school: 'École Sahel',
      plan: 'Pro',
      cycle: 'Mensuel',
      amount: 890_000,
      next: '18 mai 2026',
    },
  ] as const;
}
