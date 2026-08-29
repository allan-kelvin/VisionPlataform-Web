import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';
import { SidebarGroup } from './models/sidebar-group.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    VpIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  menu: SidebarGroup[] = [

    // ==========================================
    // DASHBOARD
    // ==========================================

    {
      title: 'Dashboard',

      expanded: true,

      items: [

        {
          title: 'Dashboard',
          icon: 'dashboard',
          route: '/dashboard'
        }

      ]

    },

    //CADASTROS
    {
      title: 'Cadastros',

      expanded: true,

      items: [

        {
          title: 'Clientes',
          icon: 'group',
          route: '/clients'
        },

        {
          title: 'Áreas',
          icon: 'business',
          route: '/areas'
        }

      ]
    },


    // ==========================================
    // PLANEJAMENTO
    // ==========================================

    {
      title: 'Planejamento',

      expanded: true,

      items: [

        {
          title: 'Planejamento de Versão',
          icon: 'calendar_month',
          route: '/planning'
        },

        {
          title: 'Versões',
          icon: 'layers',
          route: '/versions'
        },

        {
          title: 'Tarefas',
          icon: 'task_alt',
          route: '/tasks'
        }

      ]

    },


    // ==========================================
    // QUALIDADE
    // ==========================================

    {
      title: 'Qualidade',

      expanded: false,

      items: [

        {
          title: 'Evidências de Testes',
          icon: 'verified_user',
          route: '/evidences'
        }

      ]

    },


    // ==========================================
    // DEV & RELEASE
    // ==========================================

    {
      title: 'Dev & Release',

      expanded: false,

      items: [

        {
          title: 'Merge e Scripts',
          icon: 'merge',
          route: '/merge'
        },

        {
          title: 'Deployments',
          icon: 'rocket_launch',
          route: '/deployments'
        }

      ]

    },


    // ==========================================
    // DOCUMENTAÇÃO
    // ==========================================

    {
      title: 'Documentação',

      expanded: false,

      items: [

        {
          title: 'Documentação',
          icon: 'description',
          route: '/docs'
        }

      ]

    },


    // ==========================================
    // CONFIGURAÇÕES
    // ==========================================

    {
      title: 'Configurações',

      expanded: false,

      items: [

        {
          title: 'Usuários',
          icon: 'group',
          route: '/users'
        },

        {
          title: 'Configurações',
          icon: 'settings',
          route: '/settings'
        },

        {
          title: 'Integrações',
          icon: 'extension',
          route: '/integrations'
        }

      ]

    }

  ];


  // ==========================================
  // ABRIR / FECHAR GRUPO
  // ==========================================

  toggle(group: SidebarGroup): void {

    this.menu.forEach(g => {

      if (g !== group) {

        g.expanded = false;

      }

    });

    group.expanded = !group.expanded;

  }
}
