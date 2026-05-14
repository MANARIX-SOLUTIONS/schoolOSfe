import { Injectable, computed, signal } from '@angular/core';
import {
  DEFAULT_SCHOOL_ROLE,
  type SchoolRole,
  parseSchoolRole,
} from './school-role.model';

const SCHOOL_STORAGE_KEY = 'schoolos_demo_user';
const PARENT_STORAGE_KEY = 'schoolos_parent_demo_user';
const SCHOOL_ROLE_KEY = 'schoolos_school_role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Session établissement (direction, compta, vie scolaire). */
  readonly sessionLabel = signal<string | null>(null);

  /** Rôle RBAC démo pour l’espace /app. */
  readonly schoolRole = signal<SchoolRole>(DEFAULT_SCHOOL_ROLE);

  /** Session portail familles (démo). */
  readonly parentSessionLabel = signal<string | null>(null);

  /** Libellé UI du rôle courant. */
  readonly schoolRoleEffective = computed(() => this.schoolRole());

  restoreSession(): void {
    const school = localStorage.getItem(SCHOOL_STORAGE_KEY);
    if (school) {
      this.sessionLabel.set(school);
      const roleRaw = localStorage.getItem(SCHOOL_ROLE_KEY);
      const parsed = parseSchoolRole(roleRaw);
      this.schoolRole.set(parsed ?? DEFAULT_SCHOOL_ROLE);
    } else {
      this.sessionLabel.set(null);
      this.schoolRole.set(DEFAULT_SCHOOL_ROLE);
      localStorage.removeItem(SCHOOL_ROLE_KEY);
    }
    const parent = localStorage.getItem(PARENT_STORAGE_KEY);
    if (parent) {
      this.parentSessionLabel.set(parent);
    }
  }

  ensureSchoolSessionRestored(): void {
    const school = localStorage.getItem(SCHOOL_STORAGE_KEY);
    if (this.sessionLabel() !== null) {
      if (!school) {
        this.sessionLabel.set(null);
        this.schoolRole.set(DEFAULT_SCHOOL_ROLE);
        localStorage.removeItem(SCHOOL_ROLE_KEY);
        return;
      }
      const roleRaw = localStorage.getItem(SCHOOL_ROLE_KEY);
      const parsed = parseSchoolRole(roleRaw);
      this.schoolRole.set(parsed ?? DEFAULT_SCHOOL_ROLE);
      return;
    }
    if (school) {
      this.sessionLabel.set(school);
    }
    const roleRaw = localStorage.getItem(SCHOOL_ROLE_KEY);
    const parsed = parseSchoolRole(roleRaw);
    this.schoolRole.set(parsed ?? DEFAULT_SCHOOL_ROLE);
  }

  ensureParentSessionRestored(): void {
    const parent = localStorage.getItem(PARENT_STORAGE_KEY);
    if (this.parentSessionLabel() !== null) {
      if (!parent) {
        this.parentSessionLabel.set(null);
      }
      return;
    }
    if (parent) {
      this.parentSessionLabel.set(parent);
    }
  }

  isSchoolAuthenticated(): boolean {
    return this.sessionLabel() !== null;
  }

  isParentAuthenticated(): boolean {
    return this.parentSessionLabel() !== null;
  }

  startDemoSession(
    label: string,
    role: SchoolRole = DEFAULT_SCHOOL_ROLE,
  ): void {
    const trimmed = label.trim() || 'Administrateur démo';
    this.sessionLabel.set(trimmed);
    this.schoolRole.set(role);
    localStorage.setItem(SCHOOL_STORAGE_KEY, trimmed);
    localStorage.setItem(SCHOOL_ROLE_KEY, role);
  }

  startParentDemoSession(label: string): void {
    const trimmed = label.trim() || 'Famille démo';
    this.parentSessionLabel.set(trimmed);
    localStorage.setItem(PARENT_STORAGE_KEY, trimmed);
  }

  signOut(): void {
    this.sessionLabel.set(null);
    this.schoolRole.set(DEFAULT_SCHOOL_ROLE);
    localStorage.removeItem(SCHOOL_STORAGE_KEY);
    localStorage.removeItem(SCHOOL_ROLE_KEY);
  }

  signOutParent(): void {
    this.parentSessionLabel.set(null);
    localStorage.removeItem(PARENT_STORAGE_KEY);
  }
}
