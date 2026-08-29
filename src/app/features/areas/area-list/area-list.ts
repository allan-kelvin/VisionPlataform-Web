import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaResponse } from '../../../core/areas/models/area-response';
import { AreaService } from '../../../core/areas/services/area.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'app-area-list',
  imports: [FormsModule, VpIcon, VpButton],
  templateUrl: './area-list.html',
  styleUrl: './area-list.scss',
})
export class AreaList implements OnInit {

  private readonly areaService =
    inject(AreaService);

  private readonly router =
    inject(Router);


  // =========================================================
  // DADOS
  // =========================================================

  areas: AreaResponse[] = [];

  filteredAreas: AreaResponse[] = [];


  // =========================================================
  // ESTADOS
  // =========================================================

  loading = false;

  errorMessage = '';


  // =========================================================
  // FILTROS
  // =========================================================

  idFilter: number | null = null;

  descriptionFilter = '';

  statusFilter: 'all' | 'active' | 'inactive' = 'all';


  // =========================================================
  // PAGINAÇÃO
  // =========================================================

  currentPage = 1;

  pageSize = 5;


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.loadAreas();

  }


  // =========================================================
  // CARREGAR ÁREAS
  // =========================================================

  loadAreas(): void {

    this.loading = true;

    this.errorMessage = '';


    this.areaService
      .getAll()
      .subscribe({

        next: areas => {

          this.areas = areas;

          this.filteredAreas = [
            ...areas
          ];

          this.currentPage = 1;

          this.loading = false;

        },


        error: error => {

          console.error(
            'Erro ao carregar áreas:',
            error
          );

          this.errorMessage =
            'Não foi possível carregar as áreas.';

          this.loading = false;

        }

      });

  }


  // =========================================================
  // FILTRAR
  // =========================================================

  filterAreas(): void {

    const description =
      this.descriptionFilter
        .trim()
        .toLowerCase();


    this.filteredAreas =
      this.areas.filter(area => {


        // =====================================================
        // ID
        // =====================================================

        if (
          this.idFilter !== null &&
          area.id !== Number(this.idFilter)
        ) {

          return false;

        }


        // =====================================================
        // DESCRIÇÃO
        // =====================================================

        if (
          description &&
          !area.descricao
            .toLowerCase()
            .includes(description)
        ) {

          return false;

        }


        // =====================================================
        // STATUS
        // =====================================================

        if (
          this.statusFilter === 'active' &&
          !area.ativo
        ) {

          return false;

        }


        if (
          this.statusFilter === 'inactive' &&
          area.ativo
        ) {

          return false;

        }


        return true;

      });


    this.currentPage = 1;

  }


  // =========================================================
  // LIMPAR FILTROS
  // =========================================================

  clearFilters(): void {

    this.idFilter = null;

    this.descriptionFilter = '';

    this.statusFilter = 'all';

    this.filteredAreas = [
      ...this.areas
    ];

    this.currentPage = 1;

  }


  // =========================================================
  // PAGINAÇÃO
  // =========================================================

  get paginatedAreas(): AreaResponse[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;


    const end =
      start + this.pageSize;


    return this.filteredAreas.slice(
      start,
      end
    );

  }


  get totalPages(): number {

    return Math.ceil(
      this.filteredAreas.length /
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
  // CONTADOR
  // =========================================================

  get firstItem(): number {

    if (!this.filteredAreas.length) {

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
      this.filteredAreas.length
    );

  }


  // =========================================================
  // NOVA ÁREA
  // =========================================================

  newArea(): void {

    this.router.navigate([
      '/areas/new'
    ]);

  }


  // =========================================================
  // EDITAR
  // =========================================================

  editArea(
    area: AreaResponse
  ): void {

    this.router.navigate([
      '/areas',
      area.id
    ]);

  }


  // =========================================================
  // ALTERAR STATUS
  // =========================================================

  toggleAreaStatus(area: AreaResponse): void {

    const novoStatus = !area.ativo;

    this.loading = true;
    this.errorMessage = '';

    this.areaService
      .update(area.id, {
        descricao: area.descricao,
        ativo: novoStatus
      })
      .subscribe({

        next: () => {

          // Atualiza imediatamente o status na tela
          area.ativo = novoStatus;

          // Recarrega os dados do banco
          this.loadAreas();

        },

        error: error => {

          console.error(
            'Erro ao alterar status da área:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Não foi possível alterar o status da área.';

        }

      });

  }


  // =========================================================
  // RECARREGAR
  // =========================================================

  retry(): void {

    this.loadAreas();

  }

}
