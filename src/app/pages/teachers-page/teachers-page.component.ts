import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface TeacherRow {
  readonly name: string;
  readonly subjects: string;
  readonly classes: string;
  readonly email: string;
}

@Component({
  selector: 'app-teachers-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-page.component.html',
  styleUrl: './teachers-page.component.scss',
})
export class TeachersPageComponent {
  protected readonly rows = signal<TeacherRow[]>([
    {
      name: 'Aminata Faye',
      subjects: 'Mathématiques',
      classes: '4e B, 3e A',
      email: 'a.faye@lycee-horizon.sn',
    },
    {
      name: 'Ousmane Diallo',
      subjects: 'Physique-Chimie',
      classes: 'Tle S1',
      email: 'o.diallo@lycee-horizon.sn',
    },
  ]);

  protected readonly showInvite = signal(false);
  protected readonly inviteFlash = signal<string | null>(null);

  protected inviteName = '';
  protected inviteEmail = '';
  protected inviteSubjects = '';
  protected inviteClasses = '';

  protected toggleInvite(): void {
    this.showInvite.update((v) => !v);
  }

  protected sendInvite(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.rows.update((rs) => [
      ...rs,
      {
        name: this.inviteName.trim(),
        email: this.inviteEmail.trim().toLowerCase(),
        subjects: this.inviteSubjects.trim() || '—',
        classes: this.inviteClasses.trim() || '—',
      },
    ]);
    this.inviteFlash.set(
      `Invitation enregistrée pour ${this.inviteEmail} (démo — pas d’e-mail réel).`,
    );
    window.setTimeout(() => this.inviteFlash.set(null), 4000);
    f.resetForm();
    this.showInvite.set(false);
  }

  protected cancelInvite(): void {
    this.inviteName = '';
    this.inviteEmail = '';
    this.inviteSubjects = '';
    this.inviteClasses = '';
    this.showInvite.set(false);
  }
}
