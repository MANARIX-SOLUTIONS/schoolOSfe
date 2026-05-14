import type { SchoolRole } from './school-role.model';

export interface SchoolNavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
}

export interface SchoolNavGroup {
  readonly title: string;
  readonly items: readonly SchoolNavItem[];
}

function pilotageBase(): SchoolNavGroup {
  return {
    title: 'Pilotage',
    items: [
      { label: 'Tableau de bord', path: '/app/dashboard', icon: 'grid' },
      { label: 'Notifications', path: '/app/notifications', icon: 'bell' },
    ],
  };
}

function financeItems(): readonly SchoolNavItem[] {
  return [
    { label: 'Paiement', path: '/app/checkout', icon: 'wallet' },
    { label: 'Factures', path: '/app/invoices', icon: 'file' },
    { label: 'Finances', path: '/app/finance', icon: 'chart' },
  ];
}

function adminItems(): readonly SchoolNavItem[] {
  return [
    { label: 'Documents', path: '/app/documents', icon: 'folder' },
    { label: 'Rapports', path: '/app/reports', icon: 'report' },
    { label: 'Paramètres', path: '/app/settings', icon: 'cog' },
  ];
}

function vieScolaireItems(): readonly SchoolNavItem[] {
  return [
    { label: 'Élèves', path: '/app/students', icon: 'users' },
    { label: 'Classes & niveaux', path: '/app/classes', icon: 'book' },
    { label: 'Enseignants', path: '/app/teachers', icon: 'briefcase' },
    { label: 'Inscriptions', path: '/app/enrollment', icon: 'clipboard' },
    { label: 'Emploi du temps', path: '/app/timetable', icon: 'calendar' },
    { label: 'Pédagogie', path: '/app/academic', icon: 'star' },
  ];
}

function servicesItems(): readonly SchoolNavItem[] {
  return [
    { label: 'Transport', path: '/app/transport', icon: 'map' },
    { label: 'Cantine', path: '/app/cantine', icon: 'bag' },
  ];
}

export function getSchoolNavGroups(role: SchoolRole): SchoolNavGroup[] {
  switch (role) {
    case 'super-admin':
      return [
        pilotageBase(),
        {
          title: 'Plateforme (vous)',
          items: [
            {
              label: 'Onboarding écoles',
              path: '/app/platform/onboarding',
              icon: 'clipboard',
            },
            {
              label: 'Établissements',
              path: '/app/platform/schools',
              icon: 'building',
            },
            {
              label: 'Monitoring',
              path: '/app/platform/monitoring',
              icon: 'pulse',
            },
            {
              label: 'Facturation SaaS',
              path: '/app/platform/billing',
              icon: 'wallet',
            },
            {
              label: 'Support',
              path: '/app/platform/support',
              icon: 'headset',
            },
            {
              label: 'Santé & journaux',
              path: '/app/platform/health',
              icon: 'chart',
            },
          ],
        },
        {
          title: 'Administration',
          items: [
            {
              label: 'Cartes élèves (démo)',
              path: '/app/student-cards',
              icon: 'idcard',
            },
            {
              label: 'Paramètres globaux',
              path: '/app/settings',
              icon: 'cog',
            },
            { label: 'Rapports', path: '/app/reports', icon: 'report' },
          ],
        },
      ];
    case 'accountant':
      return [
        pilotageBase(),
        {
          title: 'Finance',
          items: [...financeItems()],
        },
        {
          title: 'Lecture seule',
          items: [
            { label: 'Élèves (vue)', path: '/app/students', icon: 'users' },
            { label: 'Documents', path: '/app/documents', icon: 'folder' },
          ],
        },
        {
          title: 'Administration',
          items: [
            { label: 'Rapports', path: '/app/reports', icon: 'report' },
            { label: 'Paramètres', path: '/app/settings', icon: 'cog' },
          ],
        },
      ];
    case 'teacher':
      return [
        pilotageBase(),
        {
          title: 'Enseignement',
          items: [
            { label: 'Pédagogie', path: '/app/academic', icon: 'star' },
            {
              label: 'Emploi du temps',
              path: '/app/timetable',
              icon: 'calendar',
            },
            { label: 'Élèves', path: '/app/students', icon: 'users' },
            {
              label: 'Cartes élèves',
              path: '/app/student-cards',
              icon: 'idcard',
            },
            { label: 'Documents', path: '/app/documents', icon: 'folder' },
          ],
        },
      ];
    case 'school-admin':
    default:
      return [
        pilotageBase(),
        {
          title: 'Vie scolaire',
          items: [
            ...vieScolaireItems().slice(0, 1),
            {
              label: 'Cartes élèves',
              path: '/app/student-cards',
              icon: 'idcard',
            },
            ...vieScolaireItems().slice(1),
          ],
        },
        {
          title: 'Services',
          items: servicesItems(),
        },
        {
          title: 'Finance',
          items: financeItems(),
        },
        {
          title: 'Administration',
          items: adminItems(),
        },
      ];
  }
}
