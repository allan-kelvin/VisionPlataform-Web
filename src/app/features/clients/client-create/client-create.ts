import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../core/clients/client.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'client-create',
  standalone: true,
  imports: [
    FormsModule,
    VpButton,
    VpIcon
  ],
  templateUrl: './client-create.html',
  styleUrl: './client-create.scss',
})
export class ClientCreate implements OnInit {

  private readonly clientService =
    inject(ClientService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);


  // =========================================================
  // MODO DA TELA
  // =========================================================

  isEditMode = false;

  clientId: number | null = null;


  // =========================================================
  // DADOS
  // =========================================================

  nome = '';


  // =========================================================
  // ESTADOS
  // =========================================================

  loading = false;

  errorMessage = '';

  successMessage = '';


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');


    // ---------------------------------------------------------
    // NOVO CLIENTE
    // ---------------------------------------------------------

    if (!id) {

      this.isEditMode = false;

      return;

    }


    // ---------------------------------------------------------
    // EDITAR CLIENTE
    // ---------------------------------------------------------

    this.clientId = Number(id);

    this.isEditMode = true;

    this.loadClient(this.clientId);

  }


  // =========================================================
  // CARREGAR CLIENTE
  // =========================================================

  loadClient(id: number): void {

    this.loading = true;

    this.errorMessage = '';


    this.clientService
      .getById(id)
      .subscribe({

        next: client => {

          this.nome = client.nome;

          this.loading = false;

        },


        error: error => {

          console.error(
            'Erro ao carregar cliente:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível carregar o cliente.';

        }

      });

  }


  // =========================================================
  // SALVAR
  // =========================================================

  save(): void {

    this.errorMessage = '';

    this.successMessage = '';


    // ---------------------------------------------------------
    // VALIDAÇÃO
    // ---------------------------------------------------------

    if (!this.nome.trim()) {

      this.errorMessage =
        'Informe o nome do cliente.';

      return;

    }


    // ---------------------------------------------------------
    // NOVO CLIENTE
    // ---------------------------------------------------------

    if (!this.isEditMode) {

      this.createClient();

      return;

    }


    // ---------------------------------------------------------
    // EDITAR CLIENTE
    // ---------------------------------------------------------

    this.updateClient();

  }


  // =========================================================
  // CRIAR CLIENTE
  // =========================================================

  private createClient(): void {

    this.loading = true;


    this.clientService
      .create({

        nome: this.nome.trim()

      })
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/clients'
          ]);

        },


        error: error => {

          console.error(
            'Erro ao cadastrar cliente:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível cadastrar o cliente.';

        }

      });

  }


  // =========================================================
  // ATUALIZAR CLIENTE
  // =========================================================

  private updateClient(): void {

    if (this.clientId === null) {

      return;

    }


    this.loading = true;


    this.clientService
      .update(
        this.clientId,
        {
          nome: this.nome.trim()
        }
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/clients'
          ]);

        },


        error: error => {

          console.error(
            'Erro ao atualizar cliente:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível atualizar o cliente.';

        }

      });

  }


  // =========================================================
  // CANCELAR
  // =========================================================

  cancel(): void {

    this.router.navigate([
      '/clients'
    ]);

  }

}
