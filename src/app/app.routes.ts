import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';

import { MainLayout } from './core/layout/main-layout/main-layout';


export const routes: Routes = [

  // =========================================================
  // LOGIN
  // =========================================================

  {
    path: 'login',

    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },


  // =========================================================
  // ÁREA AUTENTICADA
  // =========================================================

  {
    path: '',

    component: MainLayout,

    canActivate: [authGuard],

    children: [


      // =====================================================
      // DASHBOARD
      // =====================================================

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard')
            .then(c => c.Dashboard)
      },


      // =====================================================
      // USUÁRIOS
      // =====================================================

      {
        path: 'users',

        loadComponent: () =>
          import('./features/users/user-list/user-list')
            .then(c => c.UserList)
      },


      {
        path: 'users/new',

        loadComponent: () =>
          import('./features/users/user-create/user-create')
            .then(c => c.UserCreate)
      },


      {
        path: 'users/:id',

        loadComponent: () =>
          import('./features/users/user-create/user-create')
            .then(c => c.UserCreate)
      },


      // =====================================================
      // CLIENTES
      // =====================================================

      {
        path: 'clients',

        loadComponent: () =>
          import('./features/clients/client-list/client-list')
            .then(c => c.ClientList)
      },


      // =====================================================
      // NOVO CLIENTE
      // =====================================================


      {
        path: 'clients/new',

        loadComponent: () =>
          import('./features/clients/client-create/client-create')
            .then(c => c.ClientCreate)
      },

      // =====================================================
      // EDITAR CLIENTE
      // =====================================================

      {
        path: 'clients/:id',

        loadComponent: () =>
          import('./features/clients/client-create/client-create')
            .then(c => c.ClientCreate)
      },

      // ÁREAS

      {
        path: 'areas',

        loadComponent: () =>
          import('./features/areas/area-list/area-list')
            .then(c => c.AreaList)
      },

      {
        path: 'areas/new',

        loadComponent: () =>
          import('./features/areas/area-create/area-create')
            .then(c => c.AreaCreate)
      },

      {
        path: 'areas/:id',

        loadComponent: () =>
          import('./features/areas/area-create/area-create')
            .then(c => c.AreaCreate)
      },


    ]
  },


  // =========================================================
  // ROTA PADRÃO
  // =========================================================

  {
    path: '',

    pathMatch: 'full',

    redirectTo: 'dashboard'
  },


  // =========================================================
  // QUALQUER ROTA INVÁLIDA
  // =========================================================

  {
    path: '**',

    redirectTo: 'dashboard'
  }

];
