/** Rôles applicatifs côté espace école (SaaS + établissement). */
export type SchoolRole =
  | 'super-admin'
  | 'school-admin'
  | 'accountant'
  | 'teacher';

export const DEFAULT_SCHOOL_ROLE: SchoolRole = 'school-admin';

export const SCHOOL_ROLE_LABELS: Record<SchoolRole, string> = {
  'super-admin': 'Super administrateur',
  'school-admin': 'Admin établissement',
  accountant: 'Comptabilité',
  teacher: 'Enseignant·e',
};

/** Libellés courts pour pills / barre supérieure. */
export const SCHOOL_ROLE_SHORT: Record<SchoolRole, string> = {
  'super-admin': 'Plateforme',
  'school-admin': 'Direction',
  accountant: 'Compta',
  teacher: 'Pédagogie',
};

export function parseSchoolRole(raw: string | null): SchoolRole | null {
  if (
    raw === 'super-admin' ||
    raw === 'school-admin' ||
    raw === 'accountant' ||
    raw === 'teacher'
  ) {
    return raw;
  }
  return null;
}
