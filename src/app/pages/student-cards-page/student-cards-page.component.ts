import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface StudentCardRow {
  readonly name: string;
  readonly level: string;
  readonly ref: string;
}

@Component({
  selector: 'app-student-cards-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-cards-page.component.html',
  styleUrl: './student-cards-page.component.scss',
})
export class StudentCardsPageComponent {
  protected readonly downloadFlash = signal<string | null>(null);

  protected readonly rows: StudentCardRow[] = [
    { name: 'Aïssatou Diop', level: 'Terminale S1', ref: 'CARD-2026-0142' },
    { name: 'Ibrahima Ndiaye', level: '4e A', ref: 'CARD-2026-0089' },
    { name: 'Fatou Sarr', level: 'CP B', ref: 'CARD-2026-0034' },
    { name: 'Moussa Ba', level: '2nde A', ref: 'CARD-2026-0111' },
  ];

  protected downloadCardPdf(row: StudentCardRow): void {
    this.downloadFlash.set(
      `Carte ${row.ref} — ${row.name} (PDF démo, fichier fictif).`,
    );
    window.setTimeout(() => this.downloadFlash.set(null), 3500);
  }
}
