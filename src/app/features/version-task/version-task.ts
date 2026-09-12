import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VersionResponse } from '../../core/versions/models/version-response';
import { VersionService } from '../../core/versions/services/version.service';
import { VersionTaskResponse } from '../../core/versionsTask/models/version-task-response';
import { VersionTaskService } from '../../core/versionsTask/services/version-task.service';
import { VersionTaskCards } from './components/version-task-cards/version-task-cards';
import { VersionTaskDetails } from './components/version-task-details/version-task-details';
import { VersionTaskList } from './components/version-task-list/version-task-list';

@Component({
  selector: 'version-task',
  imports: [
    CommonModule,
    FormsModule,
    VersionTaskCards,
    VersionTaskDetails,
    VersionTaskList
  ],
  templateUrl: './version-task.html',
  styleUrl: './version-task.scss',
})
export class VersionTask implements OnInit {

  private readonly versionService =
    inject(VersionService);

  private readonly versionTaskService =
    inject(VersionTaskService);

  // =================================
  // VERSÕES
  // =================================

  versions: VersionResponse[] = [];
  filteredVersions: VersionResponse[] = [];
  selectedVersion: VersionResponse | null = null;


  // =================================
  // FILTRO DE PERÍODO
  // =================================

  dataInicial = '';

  dataFinal = '';


  // =================================
  // TAREFAS
  // =================================

  tasks: VersionTaskResponse[] = [];
  versionLiberada = false;
  loadingTasks = false;

  // =================================
  // INIT
  // =================================

  ngOnInit(): void {

    this.setDefaultPeriod();

    this.loadVersions();

  }


  // =================================
  // PERÍODO PADRÃO
  // =================================

  private setDefaultPeriod(): void {

    const hoje = new Date();

    const trintaDiasAtras =
      new Date(hoje);

    trintaDiasAtras.setDate(
      hoje.getDate() - 30
    );


    this.dataInicial =
      this.formatDateForInput(
        trintaDiasAtras
      );


    this.dataFinal =
      this.formatDateForInput(
        hoje
      );

  }


  // =================================
  // FORMATAR DATA PARA INPUT
  // =================================

  private formatDateForInput(
    date: Date
  ): string {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


  // =================================
  // CARREGAR VERSÕES
  // =================================

  loadVersions(): void {

    this.versionService
      .getAll()
      .subscribe({

        next: (versions) => {



          this.versions = versions;


          this.applyFilters();



        },

        error: (error) => {

          console.error(
            'Erro ao carregar versões:',
            error
          );

        }

      });

  }


  // =================================
  // APLICAR FILTROS
  // =================================

  applyFilters(): void {

    // =================================
    // VALIDAÇÃO DO PERÍODO
    // =================================

    if (
      this.dataInicial &&
      this.dataFinal &&
      this.dataInicial > this.dataFinal
    ) {

      console.warn(
        'A data inicial não pode ser maior que a data final.'
      );
      return;
    }

    // =================================
    // FILTRAR VERSÕES
    // =================================

    this.filteredVersions =
      this.versions.filter(version => {

        // A versão precisa possuir data de criação
        if (!version.dataCriacao) {
          return false;
        }


        // =================================
        // DATA DE CRIAÇÃO DA VERSÃO
        // =================================

        // Exemplo:
        // 2026-07-01T15:34:54.999754
        //
        // transforma em:
        // 2026-07-01

        const dataCriacao =
          version.dataCriacao.substring(0, 10);

        // =================================
        // DATA INICIAL
        // =================================

        if (
          this.dataInicial &&
          dataCriacao < this.dataInicial
        ) {
          return false;
        }

        // DATA FINAL

        if (
          this.dataFinal &&
          dataCriacao > this.dataFinal
        ) {
          return false;
        }
        return true;
      });


    // =================================
    // NENHUMA VERSÃO ENCONTRADA
    // =================================

    if (
      this.filteredVersions.length === 0
    ) {

      this.selectedVersion = null;

      this.tasks = [];

      return;

    }


    // =================================
    // VERIFICAR VERSÃO SELECIONADA
    // =================================

    const selectedStillExists =
      this.selectedVersion &&
      this.filteredVersions.some(
        version =>
          version.id === this.selectedVersion?.id
      );


    // =================================
    // SELECIONAR PRIMEIRA VERSÃO
    // =================================

    if (!selectedStillExists) {

      this.selectVersion(
        this.filteredVersions[0]
      );

    }

  }
  // =================================
  // SELECIONAR VERSÃO
  // =================================

  selectVersion(
    version: VersionResponse
  ): void {

    this.selectedVersion = version;

    // Define se a versão está liberada
    this.versionLiberada =
      version.statusVersao === 'Liberada';


    // Limpa as tarefas anteriores
    this.tasks = [];


    // Ativa loading
    this.loadingTasks = true;


    // =================================
    // BUSCAR TAREFAS DA VERSÃO
    // =================================

    this.versionTaskService
      .getByVersionId(version.id)
      .subscribe({

        next: (tasks) => {
          this.tasks = tasks;
          this.loadingTasks = false;
        },

        error: (error) => {

          console.error(
            'Erro ao carregar tarefas da versão:',
            error
          );

          this.tasks = [];

          this.loadingTasks = false;

        }

      });

  }

  onTaskSaved(): void {

    if (!this.selectedVersion) {
      return;
    }

    this.selectVersion(this.selectedVersion);

  }

  // =================================
  // ADICIONAR TAREFA
  // =================================

  openAddTask(): void {

  }


  // =================================
  // ATUALIZAR TELA
  // =================================

  refreshPage(): void {

    window.location.reload();

  }

}
