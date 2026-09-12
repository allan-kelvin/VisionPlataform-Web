import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AreaResponse } from '../../../../../core/areas/models/area-response';
import { AreaService } from '../../../../../core/areas/services/area.service';
import { ClientService } from '../../../../../core/clients/client.service';
import { ClientResponse } from '../../../../../core/clients/models/ClientResponse.interface';
import { UserResponse } from '../../../../../core/users/models/user-response';
import { UserService } from '../../../../../core/users/services/user.service';
import { VersionResponse } from '../../../../../core/versionsTask/models/VersionResponse';
import { VersionTaskService } from '../../../../../core/versionsTask/services/version-task.service';

@Component({
  selector: 'app-version-task-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './version-task-model.html',
  styleUrl: './version-task-model.scss',
})
export class VersionTaskModel implements OnInit {
  // ==========================================
  // SERVICES
  // ==========================================

  private readonly versionTaskService =
    inject(VersionTaskService);

  private readonly clienteService =
    inject(ClientService);

  private readonly areaService =
    inject(AreaService);

  private readonly userService =
    inject(UserService);


  // ==========================================
  // VERSÃO SELECIONADA
  // ==========================================

  @Input()
  version: VersionResponse | null = null;


  // ==========================================
  // EVENTO FECHAR
  // ==========================================

  @Output()
  close = new EventEmitter<void>();


  // ==========================================
  // EVENTO SALVOU
  // ==========================================

  @Output()
  saved = new EventEmitter<void>();


  // ==========================================
  // CONTROLE
  // ==========================================

  saving = false;

  loadingCadastros = false;


  // ==========================================
  // FORMULÁRIO
  // ==========================================

  form = {

    azureTaskId: null as number | null,

    azureTaskUrl: '',

    titulo: '',

    clienteId: null as number | null,

    areaId: null as number | null,

    tipo: 0,

    statusPlanejamento: 1,

    qaUserId: null as number | null,

    mergeRealizado: false,

    dataMerge: null as string | null,

    possuiScript: false,

    possuiTagVersao: false,

    nomeTagGerada: ''

  };


  // ==========================================
  // CADASTROS
  // ==========================================

  clientes: ClientResponse[] = [];

  areas: AreaResponse[] = [];

  usuariosQa: UserResponse[] = [];


  // ==========================================
  // OPÇÕES FIXAS
  // ==========================================

  tipos = [
    { id: 0, nome: 'Bug' },
    { id: 1, nome: 'Melhoria' },
    { id: 2, nome: 'Alteração' },
    { id: 3, nome: 'Correção' }
  ];


  status = [
    { id: 1, nome: 'Planejada' },
    { id: 2, nome: 'Em Teste' },
    { id: 3, nome: 'Confirmado' },
    { id: 4, nome: 'Rejeitada' },
    { id: 5, nome: 'Removida' }
  ];


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.carregarCadastros();

  }


  // ==========================================
  // CARREGAR CLIENTES / ÁREAS / QA
  // ==========================================

  private carregarCadastros(): void {

    this.loadingCadastros = true;

    this.clienteService
      .getAll()
      .subscribe({

        next: (clientes) => {

          this.clientes = clientes;

        },

        error: (error) => {

          console.error(
            'Erro ao carregar clientes:',
            error
          );

        }

      });


    this.areaService
      .getAll()
      .subscribe({

        next: (areas) => {

          // Somente áreas ativas
          this.areas = areas.filter(
            area => area.ativo
          );

        },

        error: (error) => {

          console.error(
            'Erro ao carregar áreas:',
            error
          );

        }

      });


    this.userService
      .getAll()
      .subscribe({

        next: (usuarios) => {

          // Somente usuários ativos
          this.usuariosQa = usuarios.filter(
            usuario => usuario.ativo
          );

          this.loadingCadastros = false;

        },

        error: (error) => {

          console.error(
            'Erro ao carregar usuários:',
            error
          );

          this.loadingCadastros = false;

        }

      });

  }


  // ==========================================
  // AZURE TASK ID
  // ==========================================

  onAzureTaskIdChange(): void {

    const id = this.form.azureTaskId;

    if (!id) {

      this.form.azureTaskUrl = '';

      return;

    }

    this.form.azureTaskUrl =
      `https://dev.azure.com/datasystemsoftwares/USE/_workitems/edit/${id}`;

  }


  // ==========================================
  // ABRIR AZURE
  // ==========================================

  openAzureTask(): void {

    if (!this.form.azureTaskUrl) {
      return;
    }

    window.open(
      this.form.azureTaskUrl,
      '_blank',
      'noopener,noreferrer'
    );

  }


  // ==========================================
  // FECHAR MODAL
  // ==========================================

  closeModal(): void {

    if (this.saving) {
      return;
    }

    this.close.emit();

  }


  // ==========================================
  // SALVAR
  // ==========================================

  save(): void {

    // ----------------------------------------
    // VERSÃO
    // ----------------------------------------

    if (!this.version) {

      console.error(
        'Nenhuma versão selecionada.'
      );

      return;

    }


    // ----------------------------------------
    // AZURE
    // ----------------------------------------

    if (!this.form.azureTaskId) {

      console.warn(
        'Informe o Azure Task ID.'
      );

      return;

    }


    // ----------------------------------------
    // TÍTULO
    // ----------------------------------------

    if (!this.form.titulo.trim()) {

      console.warn(
        'Informe o título da tarefa.'
      );

      return;

    }


    // ----------------------------------------
    // CLIENTE
    // ----------------------------------------

    if (!this.form.clienteId) {

      console.warn(
        'Selecione o cliente.'
      );

      return;

    }


    // ----------------------------------------
    // ÁREA
    // ----------------------------------------

    if (!this.form.areaId) {

      console.warn(
        'Selecione a área.'
      );

      return;

    }


    // ----------------------------------------
    // LOADING
    // ----------------------------------------

    this.saving = true;


    // ----------------------------------------
    // PAYLOAD
    // ----------------------------------------

    const payload = {

      versionId: this.version.id,

      azureTaskId:
        this.form.azureTaskId,

      azureTaskUrl:
        this.form.azureTaskUrl,

      titulo:
        this.form.titulo.trim(),

      clienteId:
        this.form.clienteId,

      areaId:
        this.form.areaId,

      tipo:
        this.form.tipo,

      statusPlanejamento:
        this.form.statusPlanejamento,

      qaUserId:
        this.form.qaUserId,

      mergeRealizado:
        this.form.mergeRealizado,

      dataMerge:
        this.form.mergeRealizado
          ? this.form.dataMerge
          : null,

      possuiScript:
        this.form.possuiScript,

      possuiTagVersao:
        this.form.possuiTagVersao,

      nomeTagGerada:
        this.form.possuiTagVersao
          ? this.form.nomeTagGerada.trim()
          : null

    };


    console.log(
      'PAYLOAD NOVA TAREFA:',
      payload
    );


    // ----------------------------------------
    // API
    // ----------------------------------------

    this.versionTaskService
      .create(payload)
      .subscribe({

        next: () => {

          console.log(
            'Tarefa criada com sucesso.'
          );

          this.saving = false;

          this.saved.emit();

        },


        error: (error) => {

          console.error(
            'Erro ao criar tarefa:',
            error
          );

          this.saving = false;

        }

      });

  }
}
