import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../../core/auth/models/role.model';
import { RoleService } from '../../../core/auth/services/role.service';
import { UserResponse } from '../../../core/users/models/user-response';
import { UserService } from '../../../core/users/services/user.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

interface User {
  id: number;
  nome: string;
  email: string;
  roleId: number;
  role: string;
  ativo: boolean;
}

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    FormsModule,
    VpButton,
    VpIcon,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly roleService = inject(RoleService);

  // DADOS

  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  roles: Role[] = [];
  loading = false;
  errorMessage = '';

  // FILTROS

  idFilter: number | null = null;
  nameFilter = '';
  roleFilter: number | null = null;
  statusFilter: boolean | null = null;

  // PAGINAÇÃO

  currentPage = 1;
  pageSize = 5;

  // INIT

  ngOnInit(): void {

    this.loadRoles();
    this.loadUsers();

  }

  // CARREGAR USUÁRIOS

  loadUsers(): void {

    this.loading = true;
    this.errorMessage = '';

    this.userService.getAll().subscribe({

      next: users => {

        this.users = users;

        this.filteredUsers = [...users];

        // Sempre começa na primeira página

        this.currentPage = 1;

        this.loading = false;

      },

      error: error => {

        console.error(
          'Erro ao carregar usuários:',
          error
        );

        this.errorMessage =
          'Não foi possível carregar os usuários.';

        this.loading = false;

      }

    });

  }

  // ROLES

  loadRoles(): void {

    this.roleService.getAll().subscribe({

      next: roles => {

        this.roles = roles;

      },

      error: error => {

        console.error(
          'Erro ao carregar cargos:',
          error
        );

      }

    });

  }

  // FILTRAR

  filterUsers(): void {

    const name = this.nameFilter
      .trim()
      .toLowerCase();

    this.filteredUsers = this.users.filter(user => {

      // ID

      if (
        this.idFilter !== null &&
        user.id !== Number(this.idFilter)
      ) {

        return false;

      }

      // NOME

      if (
        name &&
        !user.nome.toLowerCase().includes(name)
      ) {

        return false;

      }

      // CARGO

      if (
        this.roleFilter !== null &&
        user.roleId !== Number(this.roleFilter)
      ) {

        return false;

      }

      // STATUS

      if (
        this.statusFilter !== null &&
        user.ativo !== this.statusFilter
      ) {

        return false;

      }

      return true;

    });

    // Depois de filtrar, sempre volta para a primeira página

    this.currentPage = 1;

  }

  // LIMPAR FILTROS

  clearFilters(): void {

    this.idFilter = null;

    this.nameFilter = '';

    this.roleFilter = null;

    this.statusFilter = null;

    this.filteredUsers = [...this.users];

    // Volta para a primeira página

    this.currentPage = 1;

  }

  // ==========================================
  // PAGINAÇÃO
  // ==========================================

  get paginatedUsers(): UserResponse[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredUsers.slice(
      start,
      end
    );

  }

  get totalPages(): number {

    if (!this.filteredUsers.length) {
      return 0;
    }

    return Math.ceil(
      this.filteredUsers.length /
      this.pageSize
    );

  }

  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
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

  // ==========================================
  // NOVO USUÁRIO
  // ==========================================

  newUser(): void {

    this.router.navigate(
      ['/users/new']
    );

  }

  // ==========================================
  // EDITAR
  // ==========================================

  editUser(user: UserResponse): void {

    this.router.navigate(
      ['/users', user.id]
    );

  }

  // ==========================================
  // CONTADOR DA PAGINAÇÃO
  // ==========================================

  get firstItem(): number {

    if (!this.filteredUsers.length) {

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
      this.filteredUsers.length
    );

  }

  // ==========================================
  // RECARREGAR
  // ==========================================

  retry(): void {

    this.loadUsers();

  }

  // ALTERAR STATUS

  toggleUserStatus(user: UserResponse): void {

    if (user.ativo) {

      this.deactivateUser(user);

    } else {

      this.activateUser(user);

    }

  }

  deactivateUser(user: UserResponse): void {

    this.userService.delete(user.id).subscribe({

      next: () => {

        user.ativo = false;

      },

      error: error => {

        console.error(
          'Erro ao desativar usuário:',
          error
        );

      }

    });

  }

  activateUser(user: UserResponse): void {

    this.userService.update(
      user.id,
      {
        nome: user.nome,
        roleId: user.roleId,
        ativo: true
      }
    ).subscribe({

      next: () => {

        user.ativo = true;

      },

      error: error => {

        console.error(
          'Erro ao ativar usuário:',
          error
        );

      }

    });

  }
}
