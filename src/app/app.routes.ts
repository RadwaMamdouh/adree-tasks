import { Routes } from '@angular/router';
import { Tasks } from './pages/tasks/tasks';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: Tasks,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
];
