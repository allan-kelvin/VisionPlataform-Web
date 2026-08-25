import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';
import { SidebarGroup } from './models/sidebar-group.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, VpIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  menu: SidebarGroup[] = [

    {
      title: 'Dashboard',

      expanded: true,

      items: [
        {
          title: 'Dashboard',
          icon: 'dashboard',
          route: '/dashboard',
          active: true
        }
      ]
    },

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

  toggle(group: SidebarGroup): void {
    this.menu.forEach(g => {
      if (g !== group) {
        g.expanded = false;
      }
    });
    group.expanded = !group.expanded;

  }

  select(item: any): void {

    this.menu.forEach(group => {

      group.items.forEach(i => i.active = false);

    });

    item.active = true;

  }
}
