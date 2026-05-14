import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface ClassRow {
  readonly id: string;
  readonly name: string;
  readonly level: string;
  readonly headTeacher: string;
  readonly count: number;
}

const INITIAL_DATA: Omit<ClassRow, 'id'>[] = [
  { name: 'CP A', level: 'Primaire', headTeacher: 'Mme Sow', count: 28 },
  { name: 'CP B', level: 'Primaire', headTeacher: 'M. Ndiaye', count: 27 },
  { name: 'CE1 A', level: 'Primaire', headTeacher: 'Mme Diop', count: 30 },
  { name: 'CE1 B', level: 'Primaire', headTeacher: 'Mme Ba', count: 29 },
  { name: 'CE2 A', level: 'Primaire', headTeacher: 'M. Sarr', count: 32 },
  { name: 'CE2 B', level: 'Primaire', headTeacher: 'Mme Gaye', count: 31 },
  { name: 'CM1', level: 'Primaire', headTeacher: 'Mme Kane', count: 26 },
  { name: 'CM2', level: 'Primaire', headTeacher: 'M. Wade', count: 25 },
  { name: '6e A', level: 'Secondaire', headTeacher: 'Mme Samb', count: 35 },
  { name: '6e B', level: 'Secondaire', headTeacher: 'M. Fall', count: 34 },
  { name: '5e', level: 'Secondaire', headTeacher: 'Mme Faye', count: 33 },
  { name: '4e A', level: 'Secondaire', headTeacher: 'Mme Cissé', count: 32 },
  { name: '4e B', level: 'Secondaire', headTeacher: 'Mme Faye', count: 42 },
  { name: '3e', level: 'Secondaire', headTeacher: 'M. Dia', count: 30 },
  { name: 'Seconde', level: 'Secondaire', headTeacher: 'Mme Sagna', count: 40 },
  {
    name: 'Première S',
    level: 'Secondaire',
    headTeacher: 'M. Ndiaye',
    count: 36,
  },
  {
    name: 'Terminale S1',
    level: 'Secondaire',
    headTeacher: 'M. Seck',
    count: 38,
  },
  {
    name: 'Terminale L',
    level: 'Secondaire',
    headTeacher: 'Mme Gueye',
    count: 28,
  },
];

const INITIAL: ClassRow[] = INITIAL_DATA.map((r, i) => ({
  id: `class-${i}`,
  ...r,
}));

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
})
export class ClassesPageComponent {
  protected readonly rows = signal<ClassRow[]>([...INITIAL]);

  protected readonly showAddForm = signal(false);
  protected readonly editingId = signal<string | null>(null);

  protected newClassName = '';
  protected newCycle = 'Primaire';
  protected newHeadTeacher = '';
  protected newCount: number | null = null;

  protected editName = '';
  protected editCycle = 'Primaire';
  protected editHeadTeacher = '';
  protected editCount: number | null = null;

  protected readonly saveFlash = signal<string | null>(null);

  protected toggleAddForm(): void {
    this.editingId.set(null);
    this.showAddForm.update((v) => !v);
  }

  protected addClass(f: NgForm): void {
    const cnt = this.newCount;
    if (f.invalid || cnt === null || cnt < 0) {
      f.form.markAllAsTouched();
      return;
    }
    const id = `class-${Date.now()}`;
    this.rows.update((rs) => [
      ...rs,
      {
        id,
        name: this.newClassName.trim(),
        level: this.newCycle,
        headTeacher: this.newHeadTeacher.trim(),
        count: cnt,
      },
    ]);
    this.saveFlash.set('Classe ajoutée (démo — pas de persistance API).');
    window.setTimeout(() => this.saveFlash.set(null), 3200);
    f.resetForm();
    this.newCycle = 'Primaire';
    this.newCount = null;
    this.showAddForm.set(false);
  }

  protected cancelAdd(): void {
    this.newClassName = '';
    this.newCycle = 'Primaire';
    this.newHeadTeacher = '';
    this.newCount = null;
    this.showAddForm.set(false);
  }

  protected startEdit(row: ClassRow): void {
    this.showAddForm.set(false);
    this.editingId.set(row.id);
    this.editName = row.name;
    this.editCycle = row.level;
    this.editHeadTeacher = row.headTeacher;
    this.editCount = row.count;
  }

  protected saveEdit(f: NgForm): void {
    const id = this.editingId();
    const cnt = this.editCount;
    if (!id || f.invalid || cnt === null || cnt < 0) {
      f.form.markAllAsTouched();
      return;
    }
    this.rows.update((rs) =>
      rs.map((r) =>
        r.id === id
          ? {
              ...r,
              name: this.editName.trim(),
              level: this.editCycle,
              headTeacher: this.editHeadTeacher.trim(),
              count: cnt,
            }
          : r,
      ),
    );
    this.saveFlash.set('Classe mise à jour (démo).');
    window.setTimeout(() => this.saveFlash.set(null), 3200);
    this.cancelEdit();
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
    this.editName = '';
    this.editCycle = 'Primaire';
    this.editHeadTeacher = '';
    this.editCount = null;
  }
}
