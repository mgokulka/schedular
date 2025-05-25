import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'schedule',
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule-routing.module').then(
        (m) => m.ScheduleRoutingModule
      ),
  },
  {
    path: 'google-maps',
    loadComponent: () =>
      import('./google-maps/google-maps.component').then(
        (m) => m.GoogleMapsComponent
      ),
  },
];
