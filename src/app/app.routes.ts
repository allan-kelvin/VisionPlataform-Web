import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [

  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },

  // ÁREA AUTENTICADA
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard')
            .then(c => c.Dashboard)
      },
    ]
  },

  // ROTA PADRÃO
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },

  // QUALQUER ROTA INVÁLIDA
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
