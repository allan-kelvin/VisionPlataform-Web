import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VersionResponse } from '../../../../core/versions/models/version-response';
import { VersionTaskResponse } from '../../../../core/versionsTask/models/version-task-response';
import { VersionTaskModel } from './version-task-model/version-task-model';

@Component({
  selector: 'app-version-task-list',
  standalone: true,
  imports: [VersionTaskModel],
  templateUrl: './version-task-list.html',
  styleUrl: './version-task-list.scss',
})
export class VersionTaskList {

  // ==========================================
  // DADOS RECEBIDOS
  // ==========================================

  @Input()
  tasks: VersionTaskResponse[] = [];

  @Input()
  version: VersionResponse | null = null;

  @Input()
  versionLiberada = false;


  // ==========================================
  // EVENTOS
  // ==========================================

  @Output()
  addTask = new EventEmitter<void>();

  @Output()
  taskSaved = new EventEmitter<void>();


  // ==========================================
  // MODAL
  // ==========================================

  showTaskModal = false;


  // ==========================================
  // ABRIR MODAL
  // ==========================================

  openAddTask(): void {

    console.log('Abrindo modal de nova tarefa');

    if (!this.version) {

      console.warn(
        'Nenhuma versão selecionada.'
      );

      return;
    }

    this.showTaskModal = true;

  }


  // ==========================================
  // FECHAR MODAL
  // ==========================================

  closeTaskModal(): void {

    this.showTaskModal = false;

  }


  // ==========================================
  // TAREFA SALVA
  // ==========================================

  onTaskSaved(): void {

    // Fecha o modal
    this.showTaskModal = false;

    // Avisa o componente pai
    this.taskSaved.emit();

  }


  // ==========================================
  // CLASSE DO TIPO
  // ==========================================

  getTaskTypeClass(tipo: string): string {

    switch (tipo) {

      case 'Bug':
        return 'type-bug';

      case 'Melhoria':
        return 'type-melhoria';

      case 'Alteracao':
      case 'Alteração':
        return 'type-alteracao';

      case 'Correcao':
      case 'Correção':
        return 'type-correcao';

      default:
        return 'type-default';

    }

  }


  // ==========================================
  // CLASSE DO STATUS
  // ==========================================

  getStatusClass(status: string): string {

    switch (status) {

      case 'Confirmado':
        return 'status-confirmado';

      case 'EmTeste':
      case 'Em Teste':
        return 'status-teste';

      case 'Rejeitada':
        return 'status-rejeitada';

      case 'Removida':
        return 'status-removida';

      default:
        return 'status-planejada';

    }

  }

}
