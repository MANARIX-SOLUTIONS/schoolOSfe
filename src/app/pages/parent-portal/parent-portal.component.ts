import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FcfaPipe } from '../../core/fcfa.pipe';

@Component({
  selector: 'app-parent-portal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, FcfaPipe],
  templateUrl: './parent-portal.component.html',
  styleUrl: './parent-portal.component.scss',
})
export class ParentPortalComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  /** 0 Notes — 1 Bulletins — 2 Absences (démo lecture). */
  protected readonly schoolTab = signal(0);

  protected pickSchoolTab(index: number): void {
    this.schoolTab.set(index);
  }

  protected readonly actionToast = signal<string | null>(null);

  protected demoPdfBulletin(period: string): void {
    this.actionToast.set(`Bulletin ${period} — téléchargement simulé (démo).`);
    window.setTimeout(() => this.actionToast.set(null), 3500);
  }

  protected demoPdfReceipt(libelle: string, date: string): void {
    this.actionToast.set(
      `Reçu « ${libelle} » du ${date} — téléchargement simulé (démo).`,
    );
    window.setTimeout(() => this.actionToast.set(null), 3500);
  }

  protected readonly portalKpis = [
    {
      label: 'Solde à régler',
      kind: 'money' as const,
      valueFcfa: 450_000,
    },
    {
      label: 'Dernière action',
      kind: 'text' as const,
      text: 'Paiement T1 — 28/04/2026',
    },
    {
      label: 'Notifications',
      kind: 'text' as const,
      text: '2 messages non lus',
    },
  ] as const;

  protected familyGreeting(): string {
    const p = this.auth.parentSessionLabel();
    return p ?? 'Famille';
  }

  protected signOutParent(): void {
    this.auth.signOutParent();
    void this.router.navigate(['/parent/connexion']);
  }
}
