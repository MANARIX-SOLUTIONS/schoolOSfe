import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

type NotifFilter = 'all' | 'finance' | 'school';

interface NotificationItem {
  readonly title: string;
  readonly time: string;
  readonly preview: string;
  /** État lu / non lu (mutable en démo). */
  unread: boolean;
  readonly category: 'finance' | 'school';
}

@Component({
  selector: 'app-notifications-center',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications-center.component.html',
  styleUrl: './notifications-center.component.scss',
})
export class NotificationsCenterComponent {
  private readonly auth = inject(AuthService);

  protected readonly isSuperAdmin = computed(
    () => this.auth.schoolRole() === 'super-admin',
  );

  protected readonly filter = signal<NotifFilter>('all');

  protected readonly items = signal<NotificationItem[]>([
    {
      title: 'Paiement Wave confirmé',
      time: 'Il y a 12 min',
      preview: '450 000 FCFA — Famille Diop, facture INV-2026-0142.',
      unread: true,
      category: 'finance',
    },
    {
      title: 'Dossier inscription soumis',
      time: 'Il y a 1 h',
      preview: 'Fatou Sarr (CP) — pièces complètes, en attente validation.',
      unread: true,
      category: 'school',
    },
    {
      title: 'Rappel échéance T2',
      time: 'Hier',
      preview: '12 familles concernées — campagne SMS demain 09:00.',
      unread: false,
      category: 'finance',
    },
  ]);

  protected readonly platformItems = signal<NotificationItem[]>([
    {
      title: 'Webhook Wave — retry',
      time: 'Il y a 8 min',
      preview:
        'Tenant lycee-horizon — delivery wh_19c (signature préprod à vérifier).',
      unread: true,
      category: 'finance',
    },
    {
      title: 'Fin de période d’essai',
      time: 'Il y a 3 h',
      preview: 'Les Palmiers — conversion Standard → facture SaaS J+1.',
      unread: true,
      category: 'school',
    },
    {
      title: 'Export global tenants',
      time: 'Hier',
      preview: 'Job ej_44 terminé — 12 840 lignes, S3 bucket conformité.',
      unread: false,
      category: 'school',
    },
  ]);

  protected readonly filteredItems = computed(() => {
    const f = this.filter();
    return this.items().filter((n) => {
      if (f === 'all') {
        return true;
      }
      return n.category === f;
    });
  });

  protected readonly filteredPlatform = computed(() => {
    const f = this.filter();
    return this.platformItems().filter((n) => {
      if (f === 'all') {
        return true;
      }
      return n.category === f;
    });
  });

  protected setFilter(value: NotifFilter): void {
    this.filter.set(value);
  }

  protected markRead(item: NotificationItem): void {
    item.unread = false;
    this.items.update((xs) => [...xs]);
  }
}
