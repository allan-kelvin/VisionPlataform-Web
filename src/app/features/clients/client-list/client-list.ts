import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/clients/client.service';
import { ClientResponse } from '../../../core/clients/models/ClientResponse.interface';
import { ConfirmDialog } from '../../../shared/ui/confirm-dialog/confirm-dialog';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'app-client-list',
  imports: [FormsModule, VpIcon, VpButton, ConfirmDialog],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList implements OnInit {

  private readonly clientService =
    inject(ClientService);

  private readonly router =
    inject(Router);


  // =========================================================
  // MODAL DE EXCLUSÃO
  // =========================================================

  deleteModalOpen = false;

  selectedClient: ClientResponse | null = null;


  // =========================================================
  // DADOS
  // =========================================================

  clients: ClientResponse[] = [];

  filteredClients: ClientResponse[] = [];

  loading = false;

  errorMessage = '';


  // =========================================================
  // FILTRO
  // =========================================================

  nameFilter = '';

  idFilter: number | null = null;


  // =========================================================
  // PAGINAÇÃO
  // =========================================================

  currentPage = 1;

  pageSize = 5;


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.loadClients();

  }


  // =========================================================
  // CARREGAR CLIENTES
  // =========================================================

  loadClients(): void {

    this.loading = true;

    this.errorMessage = '';


    this.clientService
      .getAll()
      .subscribe({

        next: clients => {

          this.clients = clients;

          this.filteredClients = [
            ...clients
          ];

          this.currentPage = 1;

          this.loading = false;

        },


        error: error => {

          console.error(
            'Erro ao carregar clientes:',
            error
          );

          this.errorMessage =
            'Não foi possível carregar os clientes.';

          this.loading = false;

        }

      });

  }


  // =========================================================
  // FILTRAR CLIENTES
  // =========================================================

  filterClients(): void {

    const name =
      this.nameFilter
        .trim()
        .toLowerCase();


    this.filteredClients =
      this.clients.filter(client => {


        // -----------------------------------------------------
        // FILTRO POR ID
        // -----------------------------------------------------

        if (
          this.idFilter !== null &&
          client.id !== Number(this.idFilter)
        ) {

          return false;

        }


        // -----------------------------------------------------
        // FILTRO POR NOME
        // -----------------------------------------------------

        if (
          name &&
          !client.nome
            .toLowerCase()
            .includes(name)
        ) {

          return false;

        }


        return true;

      });


    // Volta para a primeira página
    // após aplicar os filtros.

    this.currentPage = 1;

  }


  // =========================================================
  // LIMPAR FILTROS
  // =========================================================

  clearFilters(): void {

    this.idFilter = null;

    this.nameFilter = '';

    this.filteredClients = [
      ...this.clients
    ];

    this.currentPage = 1;

  }


  // =========================================================
  // PAGINAÇÃO
  // =========================================================

  get paginatedClients(): ClientResponse[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;


    const end =
      start + this.pageSize;


    return this.filteredClients.slice(
      start,
      end
    );

  }


  get totalPages(): number {

    return Math.ceil(
      this.filteredClients.length /
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


  // =========================================================
  // CONTADOR DA TABELA
  // =========================================================

  get firstItem(): number {

    if (!this.filteredClients.length) {

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
      this.filteredClients.length
    );

  }


  // =========================================================
  // NOVO CLIENTE
  // =========================================================

  newClient(): void {

    this.router.navigate([
      '/clients/new'
    ]);

  }


  // =========================================================
  // EDITAR CLIENTE
  // =========================================================

  editClient(
    client: ClientResponse
  ): void {

    this.router.navigate([
      '/clients',
      client.id
    ]);

  }


  // =========================================================
  // ABRIR MODAL DE EXCLUSÃO
  // =========================================================

  openDeleteModal(
    client: ClientResponse
  ): void {

    this.selectedClient = client;

    this.deleteModalOpen = true;

  }


  // =========================================================
  // FECHAR MODAL
  // =========================================================

  closeDeleteModal(): void {

    this.deleteModalOpen = false;

    this.selectedClient = null;

  }


  // =========================================================
  // CONFIRMAR EXCLUSÃO
  // =========================================================

  confirmDeleteClient(): void {

    if (!this.selectedClient) {

      return;

    }


    const clientId =
      this.selectedClient.id;


    // Fecha o modal antes de executar a operação.

    this.deleteModalOpen = false;

    this.loading = true;


    this.clientService
      .delete(clientId)
      .subscribe({

        next: () => {

          this.selectedClient = null;

          this.loadClients();

        },


        error: error => {

          console.error(
            'Erro ao excluir cliente:',
            error
          );

          this.loading = false;

          this.selectedClient = null;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível excluir o cliente.';

        }

      });

  }


  // =========================================================
  // RECARREGAR
  // =========================================================

  retry(): void {

    this.loadClients();

  }

}
