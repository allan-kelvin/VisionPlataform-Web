import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VersionResponse } from '../../../core/versions/models/version-response';
import { VersionService } from '../../../core/versions/services/version.service';
import { ConfirmDialog } from '../../../shared/ui/confirm-dialog/confirm-dialog';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'app-version-list',
  imports: [FormsModule, VpIcon, VpButton, ConfirmDialog],
  templateUrl: './version-list.html',
  styleUrl: './version-list.scss',
})
export class VersionList implements OnInit {

  private readonly versionService =
    inject(VersionService);

  private readonly router =
    inject(Router);

  openActionMenuId: number | null = null;
  versions: VersionResponse[] = [];
  filteredVersions: VersionResponse[] = [];

  //confirm dialog
  cancelDialogOpen = false;
  selectedVersion: VersionResponse | null = null;

  // ESTADOS
  loading = false;
  errorMessage = '';


  // FILTROS
  idFilter: number | null = null;
  numeroVersaoFilter = '';
  statusFilter = '';
  dataLiberacaoInicio = '';
  dataLiberacaoFim = '';


  // PAGINAÇÃO
  currentPage = 1;
  pageSize = 6;


  // MENU DE AÇÕES

  openMenuId: number | null = null;

  // INIT

  ngOnInit(): void {
    this.loadVersions();
  }


  // CARREGAR VERSÕES

  loadVersions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.versionService
      .getAll()
      .subscribe({

        next: versions => {

          this.versions = versions;

          this.filteredVersions = [
            ...versions
          ];

          this.currentPage = 1;

          this.loading = false;

        },

        error: error => {

          console.error(
            'Erro ao carregar versões:',
            error
          );

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível carregar as versões.';

          this.loading = false;

        }

      });

  }


  // FILTRAR

  filterVersions(): void {

    const numeroVersao =
      this.numeroVersaoFilter
        .trim()
        .toLowerCase();


    this.filteredVersions =
      this.versions.filter(version => {


        // =====================================================
        // ID
        // =====================================================

        if (
          this.idFilter !== null &&
          version.id !== Number(this.idFilter)
        ) {

          return false;

        }


        // =====================================================
        // NÚMERO DA VERSÃO
        // =====================================================

        if (
          numeroVersao &&
          !version.numeroVersao
            .toLowerCase()
            .includes(numeroVersao)
        ) {

          return false;

        }


        // =====================================================
        // STATUS
        // =====================================================

        if (
          this.statusFilter &&
          version.statusVersao !== this.statusFilter
        ) {

          return false;

        }


        // =====================================================
        // DATA DE LIBERAÇÃO - INÍCIO
        // =====================================================

        if (
          this.dataLiberacaoInicio &&
          version.dataLiberacaoReal
        ) {

          const dataLiberacao =
            this.toDateOnly(
              version.dataLiberacaoReal
            );

          if (
            dataLiberacao <
            this.dataLiberacaoInicio
          ) {

            return false;

          }

        }


        // =====================================================
        // DATA DE LIBERAÇÃO - FIM
        // =====================================================

        if (
          this.dataLiberacaoFim &&
          version.dataLiberacaoReal
        ) {

          const dataLiberacao =
            this.toDateOnly(
              version.dataLiberacaoReal
            );

          if (
            dataLiberacao >
            this.dataLiberacaoFim
          ) {

            return false;

          }

        }


        // =====================================================
        // SEM DATA DE LIBERAÇÃO
        // =====================================================

        if (
          (this.dataLiberacaoInicio ||
            this.dataLiberacaoFim) &&
          !version.dataLiberacaoReal
        ) {

          return false;

        }


        return true;

      });


    this.currentPage = 1;

    this.openMenuId = null;

  }


  // CONVERTER DATA

  private toDateOnly(
    value: string | Date
  ): string {

    const date =
      new Date(value);

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


  // LIMPAR FILTROS

  clearFilters(): void {

    this.idFilter = null;

    this.numeroVersaoFilter = '';

    this.statusFilter = '';

    this.dataLiberacaoInicio = '';

    this.dataLiberacaoFim = '';

    this.filteredVersions = [
      ...this.versions
    ];

    this.currentPage = 1;

    this.openMenuId = null;

  }


  // PAGINAÇÃO

  get paginatedVersions(): VersionResponse[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredVersions.slice(
      start,
      end
    );

  }


  get totalPages(): number {

    return Math.ceil(
      this.filteredVersions.length /
      this.pageSize
    );

  }


  get pages(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },

      (_, index) =>
        index + 1

    );

  }


  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }

    this.currentPage = page;

  }


  // CONTADOR

  get firstItem(): number {

    if (
      !this.filteredVersions.length
    ) {

      return 0;

    }

    return (
      (this.currentPage - 1) *
      this.pageSize
    ) + 1;

  }


  get lastItem(): number {

    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredVersions.length
    );

  }


  // NOVA VERSÃO

  newVersion(): void {

    this.router.navigate([
      '/versions/new'
    ]);

  }


  // EDITAR

  editVersion(
    version: VersionResponse
  ): void {

    this.openMenuId = null;

    this.router.navigate([
      '/versions',
      version.id,
      'edit'
    ]);

  }


  // MENU DE AÇÕES

  toggleMenu(
    versionId: number
  ): void {

    if (
      this.openMenuId === versionId
    ) {

      this.openMenuId = null;

      return;

    }

    this.openMenuId = versionId;

  }


  closeMenu(): void {

    this.openMenuId = null;

  }


  // STATUS

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Liberada':
        return 'released';

      case 'EmTestes':
      case 'Em testes':
        return 'testing';

      case 'Cancelada':
        return 'cancelled';

      case 'Planejamento':
      default:
        return 'planning';

    }

  }


  getStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'EmTestes':
        return 'Em testes';

      default:
        return status;

    }

  }


  // FORMATAR DATA

  formatDate(value: string | null | undefined): string {

    if (!value) {
      return '—';
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '—';
    }

    return date.toLocaleDateString('pt-BR');
  }


  // RECARREGAR

  retry(): void {

    this.loadVersions();

  }

  toggleActionMenu(versionId: number): void {

    if (this.openActionMenuId === versionId) {

      this.openActionMenuId = null;

      return;

    }

    this.openActionMenuId = versionId;

  }


  closeActionMenu(): void {

    this.openActionMenuId = null;

  }

  // AÇÕES DA VERSÃO

  cancelVersion(
    version: VersionResponse
  ): void {

    // Não permite cancelar versão liberada

    if (version.statusVersao === 'Liberada') {

      return;

    }


    this.closeActionMenu();

    this.selectedVersion = version;

    this.cancelDialogOpen = true;

  }

  // =========================================================
  // FECHAR CONFIRM DIALOG

  closeCancelDialog(): void {
    this.cancelDialogOpen = false;
    this.selectedVersion = null;
  }

  // =========================================================
  // CONFIRMAR CANCELAMENTO
  // =========================================================

  confirmCancelVersion(): void {

    if (!this.selectedVersion) {
      return;
    }

    const version = this.selectedVersion;

    this.cancelDialogOpen = false;
    this.loading = true;

    this.versionService
      .update(version.id, {

        numeroVersao: version.numeroVersao,

        statusVersao: 'Cancelada',

        dataLimiteTarefas:
          version.dataLimiteTarefas ?? null,

        dataPrevistaLiberacao:
          version.dataPrevistaLiberacao ?? null,

        dataLiberacaoReal:
          version.dataLiberacaoReal ?? null,

        observacoes:
          version.observacoes ?? null

      })
      .subscribe({

        next: () => {

          this.selectedVersion = null;

          this.loadVersions();

        },

        error: error => {

          console.error(
            'Erro ao cancelar versão:',
            error
          );

          this.loading = false;

          this.selectedVersion = null;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível cancelar a versão.';
        }

      });
  }

  // =========================================================
  // INICIAR TESTES
  // =========================================================

  startTesting(
    version: VersionResponse
  ): void {

    if (
      version.statusVersao === 'Liberada' ||
      version.statusVersao === 'Cancelada'
    ) {

      return;

    }


    this.closeActionMenu();

    this.loading = true;


    this.versionService
      .update(version.id, {

        numeroVersao: version.numeroVersao,

        statusVersao: 'EmTestes',

        dataLimiteTarefas:
          version.dataLimiteTarefas ?? null,

        dataPrevistaLiberacao:
          version.dataPrevistaLiberacao ?? null,

        dataLiberacaoReal:
          version.dataLiberacaoReal ?? null,

        observacoes:
          version.observacoes ?? null

      })
      .subscribe({

        next: () => {

          this.loadVersions();

        },


        error: error => {

          console.error(
            'Erro ao iniciar testes:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível iniciar os testes.';

        }

      });

  }

  // =========================================================
  // LIBERAR VERSÃO
  // =========================================================

  releaseVersion(
    version: VersionResponse
  ): void {

    if (
      version.statusVersao === 'Liberada' ||
      version.statusVersao === 'Cancelada'
    ) {

      return;

    }


    this.closeActionMenu();

    this.loading = true;


    this.versionService
      .update(version.id, {

        numeroVersao: version.numeroVersao,

        statusVersao: 'Liberada',

        dataLimiteTarefas:
          version.dataLimiteTarefas ?? null,

        dataPrevistaLiberacao:
          version.dataPrevistaLiberacao ?? null,

        dataLiberacaoReal:
          new Date().toISOString(),

        observacoes:
          version.observacoes ?? null

      })
      .subscribe({

        next: () => {

          this.loadVersions();

        },


        error: error => {

          console.error(
            'Erro ao liberar versão:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível liberar a versão.';

        }

      });

  }
}
