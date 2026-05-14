import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

interface StudentRow {
  readonly name: string;
  readonly level: string;
  readonly guardian: string;
  readonly status: 'Actif' | 'En attente' | 'Ancien';
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss',
})
export class StudentsPageComponent {
  private readonly auth = inject(AuthService);

  /** Inscriptions : direction / super-admin uniquement. */
  protected readonly canManageEnrollment = computed(() => {
    const r = this.auth.schoolRole();
    return r === 'school-admin' || r === 'super-admin';
  });

  /** Cartes élèves : même périmètre que la route dédiée. */
  protected readonly canOpenStudentCards = computed(() => {
    const r = this.auth.schoolRole();
    return r === 'school-admin' || r === 'super-admin' || r === 'teacher';
  });

  /** Lien caisse : pas pour les enseignant·e·s (RBAC). */
  protected readonly canOpenCheckout = computed(() => {
    const r = this.auth.schoolRole();
    return r !== 'teacher';
  });

  protected readonly searchQuery = signal('');
  protected readonly levelFilter = signal('all');

  protected readonly exportFlash = signal<string | null>(null);

  private readonly allRows: StudentRow[] = [
    {
      name: 'Aïssatou Diop',
      level: 'Terminale S1',
      guardian: 'M. Diop',
      status: 'Actif',
    },
    {
      name: 'Ibrahima Ndiaye',
      level: '4e',
      guardian: 'Mme Ndiaye',
      status: 'Actif',
    },
    {
      name: 'Fatou Sarr',
      level: 'CP',
      guardian: 'M. Sarr',
      status: 'En attente',
    },
    { name: 'Moussa Ba', level: '2nde A', guardian: 'Mme Ba', status: 'Actif' },
  ];

  protected readonly filteredRows = computed(() => {
    const q = norm(this.searchQuery().trim());
    const f = this.levelFilter();
    return this.allRows.filter((r) => {
      if (q) {
        const hay = `${norm(r.name)} ${norm(r.guardian)} ${norm(r.level)}`;
        if (!hay.includes(q)) {
          return false;
        }
      }
      if (f === 'all') {
        return true;
      }
      const L = r.level.toLowerCase();
      if (f === 'primaire') {
        return /\bcp\b|\bce\d|\bcm\d/i.test(L) || L.includes('maternelle');
      }
      if (f === 'college') {
        return /\b[1-6]e\b|^6e|^5e|^4e|^3e/i.test(L);
      }
      if (f === 'lycee') {
        return (
          L.includes('2nde') ||
          L.includes('1ère') ||
          L.includes('terminale') ||
          L.includes('tle')
        );
      }
      return true;
    });
  });

  protected exportCsv(): void {
    const rows = this.filteredRows();
    const n = rows.length;
    this.exportFlash.set(
      n === 0
        ? 'Aucune ligne à exporter avec les filtres actuels.'
        : `Export CSV prêt (démo) : ${n} ligne(s) selon filtres affichés.`,
    );
    window.setTimeout(() => this.exportFlash.set(null), 4000);
  }
}
