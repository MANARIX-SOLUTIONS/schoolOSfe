import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent {
  protected readonly kpis = [
    {
      label: 'Classes suivies',
      value: '5',
      delta: 'Terminale S1, 4e A, 2nde A…',
      tone: 'neutral' as const,
    },
    {
      label: 'Élèves suivis',
      value: '142',
      delta: 'Vue lecture seule',
      tone: 'neutral' as const,
    },
    {
      label: 'Devoirs à corriger',
      value: '18',
      delta: '3 classes — échéance ven.',
      tone: 'warn' as const,
    },
    {
      label: 'Absences à signaler',
      value: '2',
      delta: 'Depuis l’emploi du temps',
      tone: 'up' as const,
    },
  ] as const;

  protected readonly alerts = [
    {
      title: 'Conseil de classe — S1',
      detail: 'Saisie des appréciations avant le 28/05/2026 (démo).',
      type: 'warn' as const,
    },
    {
      title: 'Document — programme maths',
      detail: 'Nouveau PDF disponible dans Documents partagés.',
      type: 'info' as const,
    },
  ] as const;

  protected readonly shortcuts = [
    { label: 'Pédagogie & notes', path: '/app/academic' },
    { label: 'Emploi du temps', path: '/app/timetable' },
    { label: 'Liste élèves', path: '/app/students' },
    { label: 'Cartes élèves (QR)', path: '/app/student-cards' },
    { label: 'Documents', path: '/app/documents' },
  ] as const;
}
