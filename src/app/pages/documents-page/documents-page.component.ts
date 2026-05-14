import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface DocRow {
  readonly name: string;
  readonly type: string;
  readonly role: string;
  readonly updated: string;
}

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
})
export class DocumentsPageComponent {
  protected readonly rows = signal<DocRow[]>([
    {
      name: 'Règlement intérieur 2025–2026.pdf',
      type: 'PDF',
      role: 'Public école',
      updated: '10/09/2025',
    },
    {
      name: 'Certificat_scolarité_Diop_Aïssatou.pdf',
      type: 'PDF',
      role: 'Direction uniquement',
      updated: '02/05/2026',
    },
    {
      name: 'Bulletin_T1_Ndiaye_Ibrahima.pdf',
      type: 'PDF',
      role: 'Famille + enseignant',
      updated: '18/01/2026',
    },
  ]);

  protected readonly showImport = signal(false);
  protected readonly importFlash = signal<string | null>(null);

  protected docLabel = '';
  protected docType = 'PDF';
  protected docVisibility = 'Public école';

  protected toggleImport(): void {
    this.showImport.update((v) => !v);
  }

  protected cancelImport(): void {
    this.docLabel = '';
    this.docType = 'PDF';
    this.docVisibility = 'Public école';
    this.showImport.set(false);
  }

  protected registerDoc(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    const label = this.docLabel.trim();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    this.rows.update((rs) => [
      {
        name: label.endsWith('.pdf') ? label : `${label}.pdf`,
        type: this.docType,
        role: this.docVisibility,
        updated: `${dd}/${mm}/${y}`,
      },
      ...rs,
    ]);
    this.importFlash.set('Document ajouté à la liste (démo — fichier fictif).');
    window.setTimeout(() => this.importFlash.set(null), 3200);
    f.resetForm();
    this.docType = 'PDF';
    this.docVisibility = 'Public école';
    this.showImport.set(false);
  }

  protected downloadDoc(row: DocRow): void {
    this.importFlash.set(
      `Téléchargement simulé : ${row.name} (URL signée en production).`,
    );
    window.setTimeout(() => this.importFlash.set(null), 3200);
  }
}
