import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PlatformTenantRow {
  readonly slug: string;
  readonly name: string;
  readonly city: string;
  readonly plan: string;
  readonly status: 'active' | 'trial' | 'suspended';
  readonly adminEmail: string;
}

@Component({
  selector: 'app-platform-schools-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <span class="eyebrow-platform">Super Admin — vous</span>
      <div class="hero__row">
        <div>
          <h1>Établissements</h1>
          <p class="sub">
            Reg multi-tenant : slug technique, contact admin, plan SaaS. Données
            de démonstration — connecter <code>schoolOSbe</code>.
          </p>
        </div>
        <div class="hero__actions">
          <a routerLink="/app/platform/onboarding" class="btn btn-primary"
            >Nouvel onboarding</a
          >
          <button
            type="button"
            class="btn btn-secondary"
            (click)="exportTenantsCsv()"
          >
            Exporter CSV
          </button>
        </div>
      </div>
    </section>

    @if (csvFlash(); as msg) {
      <p class="csv-flash card card-pad" role="status">{{ msg }}</p>
    }

    <div class="card card-pad table-wrap">
      <table class="table-app">
        <thead>
          <tr>
            <th scope="col">Tenant</th>
            <th scope="col">École</th>
            <th scope="col">Ville</th>
            <th scope="col">Plan</th>
            <th scope="col">Statut</th>
            <th scope="col">Admin</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (row of tenants; track row.slug) {
            <tr>
              <td class="mono">{{ row.slug }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.city }}</td>
              <td>{{ row.plan }}</td>
              <td>
                @switch (row.status) {
                  @case ('active') {
                    <span class="pill pill--ok">Actif</span>
                  }
                  @case ('trial') {
                    <span class="pill pill--warn">Essai</span>
                  }
                  @case ('suspended') {
                    <span class="pill pill--bad">Suspendu</span>
                  }
                }
              </td>
              <td class="email">{{ row.adminEmail }}</td>
              <td class="actions">
                <a
                  routerLink="/app/platform/features"
                  [queryParams]="{ t: row.slug }"
                  >Modules</a
                >
                <a
                  routerLink="/app/platform/billing"
                  [queryParams]="{ t: row.slug }"
                  >Factu.</a
                >
                <a
                  routerLink="/app/platform/support"
                  [queryParams]="{ t: row.slug }"
                  >Support</a
                >
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .hero__row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }
      h1 {
        font-size: 1.5rem;
        margin: 0 0 0.5rem;
      }
      .sub {
        margin: 0;
        color: var(--color-text-muted);
        max-width: 58ch;
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
      .csv-flash {
        margin-top: 1rem;
        border: 1px solid rgba(11, 122, 114, 0.28);
        background: rgba(11, 122, 114, 0.08);
        color: #065f56;
        font-size: 0.9375rem;
      }
      .table-wrap {
        margin-top: 1rem;
        overflow-x: auto;
      }
      .email {
        font-size: 0.85rem;
        word-break: break-all;
      }
      .pill {
        display: inline-block;
        padding: 0.15rem 0.5rem;
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
      .pill--bad {
        background: rgba(239, 68, 68, 0.12);
        color: #b91c1c;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        font-size: 0.8125rem;
        font-weight: 600;
      }
      .actions a {
        white-space: nowrap;
      }
    `,
  ],
})
export class PlatformSchoolsPageComponent {
  protected readonly csvFlash = signal<string | null>(null);

  protected exportTenantsCsv(): void {
    this.csvFlash.set(
      `Export CSV — ${this.tenants.length} tenant(s) (démo, fichier fictif).`,
    );
    window.setTimeout(() => this.csvFlash.set(null), 3500);
  }

  protected readonly tenants: PlatformTenantRow[] = [
    {
      slug: 'lycee-horizon',
      name: 'Lycée Horizon',
      city: 'Dakar',
      plan: 'Pro',
      status: 'active',
      adminEmail: 'direction@lycee-horizon.sn',
    },
    {
      slug: 'les-palmiers',
      name: 'Les Palmiers',
      city: 'Thiès',
      plan: 'Standard',
      status: 'trial',
      adminEmail: 'contact@lespalmiers.sn',
    },
    {
      slug: 'ecole-sahel',
      name: 'École Sahel',
      city: 'Saint-Louis',
      plan: 'Pro',
      status: 'active',
      adminEmail: 'admin@ecolesahel.sn',
    },
    {
      slug: 'demo-suspendu',
      name: '(Exemple) Institut Volt',
      city: 'Kaolack',
      plan: 'Standard',
      status: 'suspended',
      adminEmail: 'finance@institutvolt.sn',
    },
  ];
}
