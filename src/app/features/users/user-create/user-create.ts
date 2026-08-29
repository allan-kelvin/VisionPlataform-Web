import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../core/auth/models/role.model';
import { RoleService } from '../../../core/auth/services/role.service';
import { UserService } from '../../../core/users/services/user.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';

@Component({
  selector: 'user-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VpIcon,
    VpButton
  ],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss',
})
export class UserCreate {

  private readonly userService = inject(UserService);
  private readonly roleService = inject(RoleService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);


  // =====================================================
  // MODO DA TELA
  // =====================================================

  editing = false;
  userId: number | null = null;


  // =====================================================
  // DADOS
  // =====================================================

  nome = '';
  email = '';
  roleId: number | null = null;
  senha = '';
  confirmarSenha = '';

  // Status utilizado na edição
  ativo = true;


  // =====================================================
  // ROLES
  // =====================================================

  roles: Role[] = [];


  // =====================================================
  // ESTADOS
  // =====================================================

  loading = false;
  errorMessage = '';
  successMessage = '';


  // =====================================================
  // SENHAS
  // =====================================================

  showPassword = false;
  showConfirmPassword = false;


  // =====================================================
  // FOTO
  // =====================================================

  photoPreview: string | null = null;


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadRoles();

    /*
     * Se existir "id" na rota, estamos editando.
     *
     * Cadastro:
     * /users/new
     *
     * Edição:
     * /users/3/edit
     */

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editing = true;
      this.userId = Number(id);

      this.loadUser(this.userId);

    }

  }


  // =====================================================
  // CARREGAR CARGOS
  // =====================================================

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


  // =====================================================
  // CARREGAR USUÁRIO PARA EDIÇÃO
  // =====================================================

  loadUser(id: number): void {

    this.loading = true;
    this.errorMessage = '';

    this.userService.getById(id).subscribe({

      next: user => {

        this.nome = user.nome;

        this.email = user.email;

        this.roleId = user.roleId;

        this.ativo = user.ativo;

        this.loading = false;

      },

      error: error => {

        console.error(
          'Erro ao carregar usuário:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ??
          'Não foi possível carregar os dados do usuário.';

      }

    });

  }


  // =====================================================
  // FOTO
  // =====================================================

  onPhotoSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || !input.files.length) {
      return;
    }

    const file = input.files[0];

    if (file.size > 2 * 1024 * 1024) {

      this.errorMessage =
        'A imagem deve ter no máximo 2MB.';

      return;

    }

    const reader = new FileReader();

    reader.onload = () => {

      this.photoPreview =
        reader.result as string;

    };

    reader.readAsDataURL(file);

  }


  // =====================================================
  // FORÇA DA SENHA
  // =====================================================

  get passwordStrength(): number {

    /*
     * Durante a edição não estamos alterando senha.
     * Portanto, a força só é relevante no cadastro.
     */

    if (!this.senha) {
      return 0;
    }

    let strength = 0;

    if (this.senha.length >= 8) {
      strength++;
    }

    if (/[A-Z]/.test(this.senha)) {
      strength++;
    }

    if (/[a-z]/.test(this.senha)) {
      strength++;
    }

    if (/[0-9]/.test(this.senha)) {
      strength++;
    }

    if (/[^A-Za-z0-9]/.test(this.senha)) {
      strength++;
    }

    return strength;

  }


  get passwordStrengthText(): string {

    switch (this.passwordStrength) {

      case 0:
      case 1:
        return 'Fraca';

      case 2:
      case 3:
        return 'Média';

      case 4:
        return 'Forte';

      case 5:
        return 'Muito forte';

      default:
        return 'Fraca';

    }

  }


  // =====================================================
  // SALVAR
  // =====================================================

  save(): void {

    this.errorMessage = '';
    this.successMessage = '';

    /*
     * Se estamos editando,
     * não executamos as validações de senha.
     */

    if (this.editing) {

      this.updateUser();

      return;

    }


    // ===================================================
    // VALIDAÇÕES DO CADASTRO
    // ===================================================

    if (!this.nome.trim()) {

      this.errorMessage =
        'Informe o nome completo.';

      return;

    }


    if (!this.email.trim()) {

      this.errorMessage =
        'Informe o e-mail.';

      return;

    }


    if (this.roleId === null) {

      this.errorMessage =
        'Selecione o cargo do usuário.';

      return;

    }


    if (!this.senha) {

      this.errorMessage =
        'Informe uma senha.';

      return;

    }


    if (this.senha.length < 8) {

      this.errorMessage =
        'A senha deve possuir pelo menos 8 caracteres.';

      return;

    }


    if (this.senha !== this.confirmarSenha) {

      this.errorMessage =
        'As senhas não são iguais.';

      return;

    }


    // ===================================================
    // CADASTRAR
    // ===================================================

    this.createUser();

  }


  // =====================================================
  // CRIAR USUÁRIO
  // =====================================================

  private createUser(): void {

    this.loading = true;

    this.userService.create({

      nome: this.nome.trim(),

      email: this.email.trim(),

      senha: this.senha,

      roleId: this.roleId!

    }).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(
          ['/users']
        );

      },

      error: error => {

        console.error(
          'Erro ao cadastrar usuário:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ??
          'Não foi possível cadastrar o usuário.';

      }

    });

  }


  // =====================================================
  // EDITAR USUÁRIO
  // =====================================================

  private updateUser(): void {

    this.errorMessage = '';

    // Segurança: edição precisa ter ID
    if (this.userId === null) {

      this.errorMessage =
        'Usuário inválido para edição.';

      return;

    }


    // Nome
    if (!this.nome.trim()) {

      this.errorMessage =
        'Informe o nome completo.';

      return;

    }


    // Cargo
    if (this.roleId === null) {

      this.errorMessage =
        'Selecione o cargo do usuário.';

      return;

    }


    this.loading = true;


    /*
     * O backend de atualização recebe:
     *
     * Nome
     * RoleId
     * Ativo
     *
     * O e-mail não é alterado.
     * A senha também não é alterada aqui.
     */

    this.userService.update(

      this.userId,

      {

        nome: this.nome.trim(),

        roleId: this.roleId,

        ativo: this.ativo

      }

    ).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(
          ['/users']
        );

      },

      error: error => {

        console.error(
          'Erro ao atualizar usuário:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ??
          'Não foi possível atualizar o usuário.';

      }

    });

  }


  // =====================================================
  // CANCELAR
  // =====================================================

  cancel(): void {

    this.router.navigate(
      ['/users']
    );

  }

}
