import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FcfaPipe } from '../../core/fcfa.pipe';

interface MenuDay {
  readonly day: string;
  readonly meal: string;
}

@Component({
  selector: 'app-canteen-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe],
  templateUrl: './canteen-page.component.html',
  styleUrl: './canteen-page.component.scss',
})
export class CanteenPageComponent {
  protected readonly weekMenu = signal<MenuDay[]>([
    { day: 'Lundi', meal: 'Thiéboudienne' },
    { day: 'Mardi', meal: 'Yassa poulet' },
    { day: 'Mercredi', meal: 'Plat végétarien' },
  ]);

  protected dailyPrice = 2500;

  protected readonly showMenuForm = signal(false);
  protected readonly menuFlash = signal<string | null>(null);

  protected menuDay = 'Jeudi';
  protected menuMeal = '';

  protected toggleMenuForm(): void {
    this.showMenuForm.update((v) => !v);
  }

  protected addMenuDay(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.weekMenu.update((m) => [
      ...m,
      { day: this.menuDay, meal: this.menuMeal.trim() },
    ]);
    this.menuFlash.set(`Plat ajouté pour ${this.menuDay}.`);
    window.setTimeout(() => this.menuFlash.set(null), 2800);
    this.menuMeal = '';
    this.showMenuForm.set(false);
  }

  protected saveTarif(f: NgForm): void {
    if (f.invalid || this.dailyPrice < 0) {
      f.form.markAllAsTouched();
      return;
    }
    this.menuFlash.set(
      `Tarif journalier mis à jour : ${this.dailyPrice} FCFA.`,
    );
    window.setTimeout(() => this.menuFlash.set(null), 2800);
  }
}
