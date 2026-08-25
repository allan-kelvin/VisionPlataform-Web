import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    VpButton,
    VpIcon,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {

  // HEADER
  dateRange = '12/05/2025 - 19/05/2025';

  // ==========================================
  // INDICADORES

  versionsGenerated = 58;

  nextVersion = '3.63.0';

  qualityRate = 92;

  completedTasks = 142;


  // ==========================================
  // GRÁFICO - TAREFAS POR VERSÃO

  selectedVersion = 'Todas as versões';

  versions = [
    '3.63.x',
    '3.62.x',
    '3.61.x',
    '3.60.x',
    '3.59.x',
    '3.58.x',
    '3.57.x'
  ];

  improvements = [
    53,
    75,
    82,
    72,
    34,
    71,
    63
  ];

  changes = [
    29,
    41,
    53,
    34,
    26,
    40,
    37
  ];

  corrections = [
    14,
    13,
    13,
    9,
    7,
    13,
    13
  ];


  // ==========================================
  // GRÁFICO - DISTRIBUIÇÃO
  // ==========================================

  taskDistribution = {

    improvement: 142,

    change: 87,

    correction: 63,

    total: 292

  };


  // ==========================================
  // AÇÕES
  // ==========================================

  newVersion(): void {

    console.log('Nova versão');

  }


  // ==========================================
  // FILTRO
  // ==========================================

  changeVersion(): void {

    console.log(
      'Versão selecionada:',
      this.selectedVersion
    );

  }

  // ==========================================
  // INDICADORES DE QUALIDADE
  // ==========================================

  qualityIndicators = [
    {
      title: 'Cobertura de Testes',
      value: 94,
      description: 'Casos cobertos',
      icon: 'shield',
      type: 'success'
    },
    {
      title: 'Taxa de Aprovação',
      value: 92,
      description: 'Testes aprovados',
      icon: 'check_circle',
      type: 'success'
    },
    {
      title: 'Evidências',
      value: 89,
      description: 'Execuções com evidência',
      icon: 'description',
      type: 'warning'
    }
  ];


  // ==========================================
  // ÚLTIMAS VERSÕES
  // ==========================================

  recentVersions = [
    {
      version: '3.63.0',
      status: 'Em andamento',
      statusType: 'progress',
      date: '19/05/2025',
      tasks: 18
    },
    {
      version: '3.62.0',
      status: 'Concluída',
      statusType: 'success',
      date: '12/05/2025',
      tasks: 24
    },
    {
      version: '3.61.0',
      status: 'Concluída',
      statusType: 'success',
      date: '05/05/2025',
      tasks: 31
    },
    {
      version: '3.60.0',
      status: 'Concluída',
      statusType: 'success',
      date: '28/04/2025',
      tasks: 27
    }
  ];

  // ==========================================
  // ATALHOS RÁPIDOS
  // ==========================================

  quickActions = [
    {
      title: 'Nova Versão',
      description: 'Criar planejamento',
      icon: 'add_circle',
      type: 'primary'
    },
    {
      title: 'Nova Tarefa',
      description: 'Adicionar tarefa',
      icon: 'task_alt',
      type: 'warning'
    },
    {
      title: 'Enviar Evidência',
      description: 'Enviar teste',
      icon: 'upload',
      type: 'info'
    },
    {
      title: 'Ver Relatórios',
      description: 'Acessar dashboards',
      icon: 'bar_chart',
      type: 'purple'
    }
  ];


  // ==========================================
  // ATIVIDADES RECENTES
  // ==========================================

  recentActivities = [
    {
      title: 'Evidência enviada',
      description: 'Login - Teste de Fluxo',
      time: '10:24',
      icon: 'check_circle',
      type: 'success'
    },
    {
      title: 'Tarefa concluída',
      description: 'Corrigir validação de cadastro',
      time: '09:15',
      icon: 'task_alt',
      type: 'warning'
    },
    {
      title: 'Versão atualizada',
      description: 'Versão 3.62.2 liberada para homologação',
      time: 'Ontem',
      icon: 'rocket_launch',
      type: 'info'
    }
  ];

}
