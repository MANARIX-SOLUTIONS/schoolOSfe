import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.scss',
})
export class ReportsPageComponent {
  protected dateFrom = '';
  protected dateTo = '';
  protected exportKind = 'ledger';

  protected readonly exportFlash = signal<string | null>(null);

  protected requestExport(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    const labels: Record<string, string> = {
      ledger: 'Grand livre',
      overdue: 'Impayés',
      enrollments: 'Inscriptions',
      transport: 'Présence transport',
    };
    const label = labels[this.exportKind] ?? 'Export';
    this.exportFlash.set(
      `${label} — période du ${this.dateFrom} au ${this.dateTo} (file demandée, démo).`,
    );
    window.setTimeout(() => this.exportFlash.set(null), 4500);
  }

  protected quick(kind: string): void {
    this.exportKind = kind;
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    this.dateTo = end.toISOString().slice(0, 10);
    this.dateFrom = start.toISOString().slice(0, 10);
    this.exportFlash.set(
      `Préparation ${kind} sur 30 jours glissants (démo — pas de téléchargement).`,
    );
    window.setTimeout(() => this.exportFlash.set(null), 4000);
  }
}
