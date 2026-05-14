import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-academic-hub-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './academic-hub-page.component.html',
  styleUrl: './academic-hub-page.component.scss',
})
export class AcademicHubPageComponent {
  protected readonly tab = signal(0);

  protected readonly formFlash = signal<string | null>(null);

  /** Barème. */
  protected scaleSubject = 'Mathématiques';
  protected scaleCoef: number | null = 3;

  /** Absence. */
  protected absenceStudent = '';
  protected absenceDate = '';
  protected absenceReason = '';

  /** Devoir. */
  protected hwTitle = '';
  protected hwDue = '';

  protected pick(i: number): void {
    this.tab.set(i);
    this.formFlash.set(null);
  }

  private flash(msg: string): void {
    this.formFlash.set(msg);
    window.setTimeout(() => this.formFlash.set(null), 3500);
  }

  protected saveScale(f: NgForm): void {
    if (f.invalid || this.scaleCoef === null || this.scaleCoef < 0.5) {
      f.form.markAllAsTouched();
      return;
    }
    this.flash(
      `Coefficient ${this.scaleCoef} pour « ${this.scaleSubject} » enregistré (démo).`,
    );
  }

  protected saveAbsence(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.flash(
      `Absence signalée pour ${this.absenceStudent.trim()} le ${this.absenceDate}.`,
    );
    f.resetForm();
    this.absenceDate = '';
  }

  protected saveHomework(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.flash(`Devoir « ${this.hwTitle.trim()} » — échéance ${this.hwDue}.`);
    f.resetForm();
  }

  protected previewBulletin(): void {
    this.flash('Prévisualisation PDF lancée (démo — aucun fichier généré).');
  }
}
