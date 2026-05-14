import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-platform-health-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero card card-pad">
      <p class="eyebrow">Super Admin — vous</p>
      <h1>Santé & journaux</h1>
      <p class="sub">
        Statut des services et extrait de journaux (démo). Vue synthétique :
        <a routerLink="/app/platform/monitoring">Monitoring plateforme</a>.
      </p>
    </section>

    <div class="grid">
      <article class="card card-pad">
        <h2>API</h2>
        <p class="stat stat--ok">Opérationnel</p>
        <p class="meta">p95 120 ms (24 h)</p>
      </article>
      <article class="card card-pad">
        <h2>Webhooks</h2>
        <p class="stat stat--warn">2 retries en attente</p>
        <p class="meta">Wave — DLQ inspectable</p>
      </article>
      <article class="card card-pad">
        <h2>Base de données</h2>
        <p class="stat stat--ok">Réplication OK</p>
        <p class="meta">Sauvegardes quotidiennes</p>
      </article>
    </div>

    <section class="card card-pad links">
      <h2>Navigation</h2>
      <div class="link-grid">
        <a routerLink="/app/platform/monitoring" class="link-tile"
          >Monitoring</a
        >
        <a routerLink="/app/platform/support" class="link-tile">Support</a>
        <a routerLink="/app/platform/onboarding" class="link-tile"
          >Onboarding</a
        >
        <a routerLink="/app/platform/schools" class="link-tile">Écoles</a>
      </div>
    </section>

    <section class="card card-pad log">
      <h2>Derniers événements</h2>
      <pre class="log__pre" aria-label="Extrait de journaux">{{ logTail }}</pre>
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
        font-size: 1.5rem;
        margin: 0 0 0.5rem;
      }
      .sub {
        margin: 0;
        color: var(--color-text-muted);
        max-width: 60ch;
        line-height: 1.5;
      }
      .sub a {
        font-weight: 600;
      }
      .grid {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 720px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      h2 {
        font-size: 1rem;
        margin: 0 0 0.5rem;
      }
      .stat {
        font-weight: 700;
        margin: 0;
        font-size: 1.05rem;
      }
      .stat--ok {
        color: var(--color-success);
      }
      .stat--warn {
        color: var(--color-warning);
      }
      .meta {
        margin: 0.35rem 0 0;
        font-size: 0.8125rem;
        color: var(--color-text-muted);
      }
      .links {
        margin-top: 1rem;
      }
      .link-grid {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
      }
      .link-tile {
        display: block;
        padding: 0.65rem 0.75rem;
        border-radius: var(--radius-md);
        background: rgba(11, 122, 114, 0.07);
        color: var(--color-text);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        text-align: center;
        border: 1px solid rgba(11, 122, 114, 0.12);
        transition: background var(--duration-fast) var(--ease-out);
      }
      .link-tile:hover {
        background: rgba(11, 122, 114, 0.12);
        text-decoration: none;
      }
      .log {
        margin-top: 1rem;
      }
      .log__pre {
        margin: 0;
        padding: 0.85rem 1rem;
        background: rgba(15, 23, 42, 0.04);
        border-radius: var(--radius-md);
        font-size: 0.72rem;
        line-height: 1.45;
        overflow-x: auto;
        border: 1px solid var(--color-border);
      }
    `,
  ],
})
export class PlatformHealthPageComponent {
  protected readonly logTail = `[2026-05-13T08:12:01Z] INFO  api request_id=req_8k2 tenant=lycee-horizon GET /v1/students 200 42ms
[2026-05-13T08:12:04Z] WARN  webhooks.wave delivery_id=wh_19c retry=1 pending
[2026-05-13T08:12:09Z] INFO  worker export_job=ej_44 status=completed rows=12840
[2026-05-13T08:12:11Z] ERROR billing invoice_inv_2 sync 502 (retried)`;
}
