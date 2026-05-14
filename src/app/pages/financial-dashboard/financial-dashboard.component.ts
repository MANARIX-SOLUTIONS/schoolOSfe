import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-financial-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe],
  templateUrl: './financial-dashboard.component.html',
  styleUrl: './financial-dashboard.component.scss',
})
export class FinancialDashboardComponent {
  protected readonly months = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
  ] as const;
  protected readonly bars = [42, 55, 48, 62, 88, 72] as const;

  protected exportStart = '';
  protected exportEnd = '';
  protected readonly exportFlash = signal<string | null>(null);

  protected requestLedgerExport(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.exportFlash.set(
      `Export grand livre demandé du ${this.exportStart} au ${this.exportEnd} (démo).`,
    );
    window.setTimeout(() => this.exportFlash.set(null), 4000);
  }

  protected quickExportImpayes(): void {
    this.exportFlash.set(
      'Export « impayés prioritaires » prêt à télécharger (démo — 12 lignes).',
    );
    window.setTimeout(() => this.exportFlash.set(null), 4000);
  }
}
