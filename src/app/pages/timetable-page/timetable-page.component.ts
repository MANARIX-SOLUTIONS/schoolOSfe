import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TimetableClass = '4e-b' | 'tle-s1';

@Component({
  selector: 'app-timetable-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timetable-page.component.html',
  styleUrl: './timetable-page.component.scss',
})
export class TimetablePageComponent {
  protected readonly selectedClass = signal<TimetableClass>('4e-b');

  protected readonly exportFlash = signal<string | null>(null);

  protected readonly days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'] as const;
  protected readonly slots = ['08:00', '10:00', '14:00', '16:00'] as const;

  protected cell(dayIndex: number, slotIndex: number): string {
    const cls = this.selectedClass();
    if (cls === '4e-b') {
      if (dayIndex === 0 && slotIndex === 0) {
        return 'Math — 4e B';
      }
      if (dayIndex === 2 && slotIndex === 1) {
        return 'Français — 4e B';
      }
      if (slotIndex === 3) {
        return 'EPS';
      }
      return '—';
    }
    if (dayIndex === 0 && slotIndex === 0) {
      return 'Philo — Tle S1';
    }
    if (dayIndex === 2 && slotIndex === 1) {
      return 'PC — Tle S1';
    }
    if (slotIndex === 3) {
      return 'Sport';
    }
    return '—';
  }

  protected exportPdf(): void {
    const label = this.selectedClass() === '4e-b' ? '4e B' : 'Terminale S1';
    this.exportFlash.set(
      `PDF emploi du temps — ${label} (génération démo, pas de fichier).`,
    );
    window.setTimeout(() => this.exportFlash.set(null), 3500);
  }
}
