import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../core/areas/services/area.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'app-area-create',
  imports: [FormsModule, VpIcon, VpButton],
  templateUrl: './area-create.html',
  styleUrl: './area-create.scss',
})
export class AreaCreate implements OnInit {

  private readonly areaService =
    inject(AreaService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);


  // =========================================================
  // EDIÇÃO
  // =========================================================

  areaId: number | null = null;

  isEditMode = false;


  // =========================================================
  // DADOS
  // =========================================================

  descricao = '';

  ativo = true;


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
    // EDIÇÃO
    // ---------------------------------------------------------

    if (id) {

      this.areaId = Number(id);

      this.isEditMode = true;

      this.loadArea();

    }

  }


  // =========================================================
  // CARREGAR ÁREA
  // =========================================================

  loadArea(): void {

    if (!this.areaId) {

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.areaService
      .getById(this.areaId)
      .subscribe({

        next: area => {

          this.descricao =
            area.descricao;

          this.ativo =
            area.ativo;

          this.loading = false;

        },


        error: error => {

          console.error(
            'Erro ao carregar área:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível carregar a área.';

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

    if (!this.descricao.trim()) {

      this.errorMessage =
        'Informe a descrição da área.';

      return;

    }


    // ---------------------------------------------------------
    // EDITAR
    // ---------------------------------------------------------

    if (
      this.isEditMode &&
      this.areaId !== null
    ) {

      this.updateArea();

      return;

    }


    // ---------------------------------------------------------
    // CADASTRAR
    // ---------------------------------------------------------

    this.createArea();

  }


  // =========================================================
  // CRIAR
  // =========================================================

  private createArea(): void {

    this.loading = true;


    this.areaService
      .create({

        descricao:
          this.descricao.trim(),

        ativo:
          this.ativo

      })
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/areas'
          ]);

        },


        error: error => {

          console.error(
            'Erro ao cadastrar área:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível cadastrar a área.';

        }

      });

  }


  // =========================================================
  // ATUALIZAR
  // =========================================================

  private updateArea(): void {

    if (this.areaId === null) {

      return;

    }


    this.loading = true;


    this.areaService
      .update(
        this.areaId,

        {
          descricao:
            this.descricao.trim(),

          ativo:
            this.ativo

        }
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/areas'
          ]);

        },


        error: error => {

          console.error(
            'Erro ao atualizar área:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível atualizar a área.';

        }

      });

  }


  // =========================================================
  // CANCELAR
  // =========================================================

  cancel(): void {

    this.router.navigate([
      '/areas'
    ]);

  }

}
