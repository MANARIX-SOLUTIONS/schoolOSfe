import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

type FeatureId =
  | 'transport'
  | 'cantine'
  | 'parent_portal'
  | 'finance_advanced'
  | 'reports_exports'
  | 'pedagogy'
  | 'enrollment'
  | 'documents';

interface FeatureDef {
  readonly id: FeatureId;
  readonly label: string;
  readonly hint: string;
}

interface TenantOption {
  readonly slug: string;
  readonly name: string;
}

function emptyFeatures(): Record<FeatureId, boolean> {
  return {
    transport: false,
    cantine: false,
    parent_portal: false,
    finance_advanced: false,
    reports_exports: false,
    pedagogy: false,
    enrollment: false,
    documents: false,
  };
}

function buildInitialEntitlements(): Record<
  string,
  Record<FeatureId, boolean>
> {
  const slugs = [
    'lycee-horizon',
    'les-palmiers',
    'ecole-sahel',
    'demo-suspendu',
  ] as const;
  const init: Record<string, Record<FeatureId, boolean>> = {};
  for (const slug of slugs) {
    init[slug] = initialForSlug(slug);
  }
  return init;
}

function initialForSlug(slug: string): Record<FeatureId, boolean> {
  const allOn = (): Record<FeatureId, boolean> => ({
    transport: true,
    cantine: true,
    parent_portal: true,
    finance_advanced: true,
    reports_exports: true,
    pedagogy: true,
    enrollment: true,
    documents: true,
  });
  if (slug === 'demo-suspendu') {
    return {
      ...emptyFeatures(),
      documents: true,
    };
  }
  if (slug === 'les-palmiers') {
    const b = allOn();
    return { ...b, reports_exports: false, finance_advanced: false };
  }
  return allOn();
}

@Component({
  selector: 'app-platform-features-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <span class="eyebrow-platform">Super Admin — vous</span>
      <h1>Fonctionnalités &amp; entitlements</h1>
      <p class="sub">
        Activez ou coupez des modules par tenant (slug). Données de démo en
        mémoire — brancher sur <code>schoolOSbe</code> pour persistance et
        audit.
      </p>
    </section>

    @if (saveFlash(); as msg) {
      <p class="flash card card-pad" role="status">{{ msg }}</p>
    }

    <div class="toolbar card card-pad">
      <label class="picker">
        <span class="picker__label">Tenant</span>
        <select
          class="picker__select"
          [value]="activeSlug()"
          (change)="onTenantSelect($event)"
        >
          @for (opt of tenantOptions; track opt.slug) {
            <option [value]="opt.slug">{{ opt.name }} ({{ opt.slug }})</option>
          }
        </select>
      </label>
      <a routerLink="/app/platform/schools" class="btn btn-secondary"
        >← Établissements</a
      >
    </div>

    <div class="card card-pad features">
      <h2 class="features__title">Modules pour {{ activeTenantLabel() }}</h2>
      <p class="muted">
        Clé technique : <span class="mono">{{ activeSlug() }}</span>
      </p>
      <ul class="feature-list" role="list">
        @for (f of featureCatalog; track f.id) {
          <li class="feature-list__item">
            <div class="feature-list__text">
              <span class="feature-list__label">{{ f.label }}</span>
              <span class="feature-list__hint">{{ f.hint }}</span>
              <span class="feature-list__id mono">{{ f.id }}</span>
            </div>
            <button
              type="button"
              class="toggle"
              [class.toggle--on]="isEnabled(f.id)"
              [attr.aria-pressed]="isEnabled(f.id)"
              (click)="toggle(f.id)"
            >
              {{ isEnabled(f.id) ? 'Activé' : 'Désactivé' }}
            </button>
          </li>
        }
      </ul>
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
      .sub code {
        font-size: 0.85em;
        padding: 0.05rem 0.3rem;
        border-radius: 4px;
        background: rgba(15, 23, 42, 0.06);
      }
      .flash {
        margin-top: 1rem;
        border: 1px solid rgba(11, 122, 114, 0.28);
        background: rgba(11, 122, 114, 0.08);
        color: #065f56;
        font-size: 0.9375rem;
      }
      .toolbar {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
      }
      .picker {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-width: min(100%, 280px);
      }
      .picker__label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-text-muted);
      }
      .picker__select {
        font: inherit;
        padding: 0.55rem 0.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border-strong);
        background: var(--color-surface);
        color: var(--color-text);
      }
      .features {
        margin-top: 1rem;
      }
      .features__title {
        font-size: 1.05rem;
        margin: 0 0 0.35rem;
      }
      .muted {
        margin: 0 0 1rem;
        font-size: 0.875rem;
        color: var(--color-text-muted);
      }
      .mono {
        font-family: ui-monospace, monospace;
        font-size: 0.9em;
      }
      .feature-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .feature-list__item {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.9rem 0;
        border-bottom: 1px solid var(--color-border);
      }
      .feature-list__item:last-child {
        border-bottom: none;
      }
      .feature-list__text {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        max-width: min(100%, 48ch);
      }
      .feature-list__label {
        font-weight: 600;
        font-size: 0.9375rem;
      }
      .feature-list__hint {
        font-size: 0.8125rem;
        color: var(--color-text-muted);
        line-height: 1.4;
      }
      .feature-list__id {
        font-size: 0.72rem;
        color: var(--color-text-subtle);
      }
      .toggle {
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.45rem 0.85rem;
        border-radius: 999px;
        border: 1px solid var(--color-border-strong);
        background: var(--color-surface);
        color: var(--color-text-muted);
        cursor: pointer;
        flex-shrink: 0;
        transition:
          background var(--duration-fast) var(--ease-out),
          color var(--duration-fast) var(--ease-out),
          border-color var(--duration-fast) var(--ease-out);
      }
      .toggle--on {
        background: rgba(11, 122, 114, 0.16);
        border-color: rgba(11, 122, 114, 0.45);
        color: var(--color-primary);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--color-ring);
        outline-offset: 2px;
      }
    `,
  ],
})
export class PlatformFeaturesPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly tenantOptions: readonly TenantOption[] = [
    { slug: 'lycee-horizon', name: 'Lycée Horizon' },
    { slug: 'les-palmiers', name: 'Les Palmiers' },
    { slug: 'ecole-sahel', name: 'École Sahel' },
    { slug: 'demo-suspendu', name: '(Exemple) Institut Volt' },
  ];

  protected readonly featureCatalog: readonly FeatureDef[] = [
    {
      id: 'transport',
      label: 'Transport scolaire',
      hint: 'Lignes, inscriptions, forfaits liés aux frais.',
    },
    {
      id: 'cantine',
      label: 'Cantine',
      hint: 'Menus, quotas et tarification jour / élève.',
    },
    {
      id: 'parent_portal',
      label: 'Portail familles',
      hint: 'Accès parents : notes, bulletins, devoirs, paiements.',
    },
    {
      id: 'finance_advanced',
      label: 'Paiement & facturation',
      hint: 'Encaissement, factures élèves, checkout opérateurs.',
    },
    {
      id: 'reports_exports',
      label: 'Rapports & exports',
      hint: 'Grand livre, impayés, CSV / PDF côté serveur.',
    },
    {
      id: 'pedagogy',
      label: 'Pédagogie & cartes',
      hint: 'Notes, bulletins, absences, cartes élèves.',
    },
    {
      id: 'enrollment',
      label: 'Inscriptions',
      hint: 'Flux d’entrée / dossiers nouveaux élèves.',
    },
    {
      id: 'documents',
      label: 'Documents',
      hint: 'Bibliothèque versionnée et visibilité par rôle.',
    },
  ];

  private readonly slugSet = new Set(this.tenantOptions.map((t) => t.slug));

  private readonly querySlug = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get('t'))),
    { initialValue: null },
  );

  protected readonly activeSlug = computed(() => {
    const q = this.querySlug();
    if (q && this.slugSet.has(q)) {
      return q;
    }
    return this.tenantOptions[0].slug;
  });

  protected readonly activeTenantLabel = computed(() => {
    const s = this.activeSlug();
    return this.tenantOptions.find((t) => t.slug === s)?.name ?? s;
  });

  /** Per-tenant feature map (demo only). */
  protected readonly entitlements = signal<
    Record<string, Record<FeatureId, boolean>>
  >(buildInitialEntitlements());

  protected readonly saveFlash = signal<string | null>(null);
  private flashTimer: ReturnType<typeof window.setTimeout> | undefined;

  protected isEnabled(id: FeatureId): boolean {
    const slug = this.activeSlug();
    return this.entitlements()[slug]?.[id] ?? false;
  }

  protected toggle(id: FeatureId): void {
    const slug = this.activeSlug();
    this.entitlements.update((m) => {
      const prev = m[slug] ?? emptyFeatures();
      return {
        ...m,
        [slug]: { ...prev, [id]: !prev[id] },
      };
    });
    if (this.flashTimer !== undefined) {
      window.clearTimeout(this.flashTimer);
    }
    const on = this.isEnabled(id);
    this.saveFlash.set(
      `Démo : « ${id} » ${on ? 'activé' : 'désactivé'} pour ${slug} — non persisté (API à brancher).`,
    );
    this.flashTimer = window.setTimeout(() => {
      this.saveFlash.set(null);
      this.flashTimer = undefined;
    }, 3800);
  }

  protected onTenantSelect(ev: Event): void {
    const v = (ev.target as HTMLSelectElement).value;
    if (!this.slugSet.has(v)) {
      return;
    }
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { t: v },
      queryParamsHandling: 'merge',
    });
  }
}
