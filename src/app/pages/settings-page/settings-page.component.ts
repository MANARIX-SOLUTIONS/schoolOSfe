import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly isSuperAdmin = computed(
    () => this.auth.schoolRole() === 'super-admin',
  );

  protected displayName = 'Lycée Horizon';
  protected timezone = 'Africa/Dakar';
  protected language = 'fr-SN';
  protected mfaAccounting = false;

  protected readonly saveState = signal<'idle' | 'saved'>('idle');

  protected saveGeneral(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.saveState.set('saved');
    window.setTimeout(() => {
      this.saveState.set('idle');
    }, 2800);
  }
}
