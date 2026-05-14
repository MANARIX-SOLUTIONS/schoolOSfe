import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FcfaPipe } from '../../core/fcfa.pipe';

interface LineRow {
  readonly name: string;
  readonly stops: string;
  readonly subscribers: number;
  readonly fee: number;
}

@Component({
  selector: 'app-transport-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe],
  templateUrl: './transport-page.component.html',
  styleUrl: './transport-page.component.scss',
})
export class TransportPageComponent {
  protected readonly rows = signal<LineRow[]>([
    {
      name: 'Ligne Plateau — Almadies',
      stops: '12 arrêts',
      subscribers: 64,
      fee: 55_000,
    },
    {
      name: 'Ligne Parcelles — Ouakam',
      stops: '9 arrêts',
      subscribers: 41,
      fee: 45_000,
    },
  ]);

  protected readonly showLineForm = signal(false);
  protected readonly lineFlash = signal<string | null>(null);

  protected lineName = '';
  protected lineStops = '';
  protected lineSubs: number | null = null;
  protected lineFee: number | null = null;

  protected toggleLineForm(): void {
    this.showLineForm.update((v) => !v);
  }

  protected addLine(f: NgForm): void {
    const subs = this.lineSubs;
    const fee = this.lineFee;
    if (f.invalid || subs === null || fee === null || subs < 0 || fee < 0) {
      f.form.markAllAsTouched();
      return;
    }
    const stopsLabel = this.lineStops.trim() || '—';
    this.rows.update((rs) => [
      ...rs,
      {
        name: this.lineName.trim(),
        stops: stopsLabel,
        subscribers: subs,
        fee,
      },
    ]);
    this.lineFlash.set('Ligne enregistrée (démo).');
    window.setTimeout(() => this.lineFlash.set(null), 3000);
    f.resetForm();
    this.lineSubs = null;
    this.lineFee = null;
    this.showLineForm.set(false);
  }

  protected cancelLine(): void {
    this.lineName = '';
    this.lineStops = '';
    this.lineSubs = null;
    this.lineFee = null;
    this.showLineForm.set(false);
  }
}
