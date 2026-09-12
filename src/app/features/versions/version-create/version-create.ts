import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionCreateRequest } from '../../../core/versions/models/version-create-request';
import { VersionUpdateRequest } from '../../../core/versions/models/version-update-request';
import { VersionService } from '../../../core/versions/services/version.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'app-version-create',
  imports: [FormsModule, VpButton, VpIcon],
  templateUrl: './version-create.html',
  styleUrl: './version-create.scss',
})
export class VersionCreate implements OnInit {
  private readonly versionService =
    inject(VersionService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);


  // =========================================================
  // MODO DA TELA
  // =========================================================

  isEdit = false;

  versionId: number | null = null;


  // =========================================================
  // DADOS
  // =========================================================

  numeroVersao = '';

  statusVersao = 'Planejamento';

  dataLimiteTarefas = '';

  dataPrevistaLiberacao = '';

  observacoes = '';


  // =========================================================
  // ESTADOS
  // =========================================================

  loading = false;

  saving = false;

  errorMessage = '';


  // =========================================================
  // STATUS
  // =========================================================

  statusOptions = [
    {
      value: 'Planejamento',
      label: 'Planejamento'
    },

    {
      value: 'EmTestes',
      label: 'Em testes'
    },

    {
      value: 'Liberada',
      label: 'Liberada'
    },

    {
      value: 'Cancelada',
      label: 'Cancelada'
    }
  ];


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');


    if (id) {

      this.isEdit = true;

      this.versionId =
        Number(id);

      this.loadVersion();

    }

  }


  // =========================================================
  // CARREGAR VERSÃO
  // =========================================================

  loadVersion(): void {

    if (!this.versionId) {

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.versionService
      .getById(this.versionId)
      .subscribe({

        next: version => {

          this.numeroVersao =
            version.numeroVersao;

          this.statusVersao =
            version.statusVersao;

          this.dataLimiteTarefas =
            this.formatDateForInput(
              version.dataLimiteTarefas
            );

          this.dataPrevistaLiberacao =
            this.formatDateForInput(
              version.dataPrevistaLiberacao
            );

          this.observacoes =
            version.observacoes ?? '';


          this.loading = false;

        },


        error: error => {

          console.error(
            'Erro ao carregar versão:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível carregar a versão.';

        }

      });

  }


  // =========================================================
  // SALVAR
  // =========================================================

  save(): void {

    this.errorMessage = '';


    // ---------------------------------------------------------
    // VALIDAÇÃO
    // ---------------------------------------------------------

    if (!this.numeroVersao.trim()) {

      this.errorMessage =
        'Informe o número da versão.';

      return;

    }


    if (!this.statusVersao) {

      this.errorMessage =
        'Informe o status da versão.';

      return;

    }


    // ---------------------------------------------------------
    // LOADING
    // ---------------------------------------------------------

    this.saving = true;


    // ---------------------------------------------------------
    // NOVA VERSÃO
    // ---------------------------------------------------------

    if (!this.isEdit) {

      const request: VersionCreateRequest = {

        numeroVersao:
          this.numeroVersao.trim(),

        statusVersao:
          this.statusVersao,

        dataLimiteTarefas:
          this.dataLimiteTarefas || null,

        dataPrevistaLiberacao:
          this.dataPrevistaLiberacao || null,

        observacoes:
          this.observacoes.trim() || null

      };


      this.versionService
        .create(request)
        .subscribe({

          next: () => {

            this.saving = false;

            this.router.navigate([
              '/versions'
            ]);

          },


          error: error => {

            console.error(
              'Erro ao cadastrar versão:',
              error
            );

            this.saving = false;

            this.errorMessage =
              error?.error?.message ??
              'Não foi possível cadastrar a versão.';

          }

        });


      return;

    }


    // ---------------------------------------------------------
    // EDITAR VERSÃO
    // ---------------------------------------------------------

    if (!this.versionId) {

      this.saving = false;

      return;

    }


    const updateRequest: VersionUpdateRequest = {

      numeroVersao:
        this.numeroVersao.trim(),

      statusVersao:
        this.statusVersao,

      dataLimiteTarefas:
        this.dataLimiteTarefas || null,

      dataPrevistaLiberacao:
        this.dataPrevistaLiberacao || null,

      dataLiberacaoReal: null,

      observacoes:
        this.observacoes.trim() || null

    };


    this.versionService
      .update(
        this.versionId,
        updateRequest
      )
      .subscribe({

        next: () => {

          this.saving = false;

          this.router.navigate([
            '/versions'
          ]);

        },

        error: error => {
          console.error(
            'Erro ao editar versão:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível editar a versão.';
        }
      });
  }

  // =========================================================
  // CANCELAR

  cancel(): void {

    this.router.navigate([
      '/versions'
    ]);

  }

  // =========================================================
  // DATA

  private formatDateForInput(
    date: string | null | undefined
  ): string {

    if (!date) {

      return '';

    }
    return date.substring(0, 10);
  }

  formatVersion(value: string): void {

    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');

    if (!numbers) {
      this.numeroVersao = '';
      return;
    }

    // Limita a 5 números
    const limited = numbers.substring(0, 5);

    let formatted = limited;

    if (limited.length > 1) {
      formatted =
        limited.substring(0, 1) +
        '.' +
        limited.substring(1);
    }

    if (limited.length > 3) {
      formatted =
        limited.substring(0, 1) +
        '.' +
        limited.substring(1, 3) +
        '.' +
        limited.substring(3);
    }

    if (limited.length > 4) {
      formatted =
        limited.substring(0, 1) +
        '.' +
        limited.substring(1, 3) +
        '.' +
        limited.substring(3, 4) +
        '.' +
        limited.substring(4, 5);
    }

    this.numeroVersao = formatted;
  }

}
