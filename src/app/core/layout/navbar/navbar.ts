import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { VpAvatar } from '../../../shared/ui/vp-avatar/vp-avatar';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    VpIcon,
    VpAvatar,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  notifications = 3;

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);


  // MENU DO USUÁRIO

  userMenuOpen = false;


  // DADOS DO USUÁRIO

  userName = '';

  userRole = '';

  userInitials = '';


  constructor() {

    this.loadUser();

  }

  // CARREGAR USUÁRIO

  private loadUser(): void {

    const email =
      localStorage.getItem('vision_email');

    const role =
      localStorage.getItem('vision_role');


    this.userName =
      this.getUserName(email);


    this.userRole =
      role || 'Usuário';

    this.userInitials =
      this.getInitials(this.userName);

  }

  // NOME DO USUÁRIO

  private getUserName(email: string | null): string {

    if (!email) {
      return 'Usuário';
    }
    const name =
      email.split('@')[0];
    return name
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, letter =>
        letter.toUpperCase()
      );

  }
  // INICIAIS

  private getInitials(name: string): string {

    const parts =
      name.trim().split(/\s+/);

    if (parts.length === 1) {

      return parts[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();

  }

  // ABRIR / FECHAR MENU

  toggleUserMenu(): void {
    this.userMenuOpen =
      !this.userMenuOpen;

  }

  // FECHAR AO CLICAR FORA
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    const target =
      event.target as HTMLElement;


    if (
      !target.closest('.navbar__user')
    ) {

      this.userMenuOpen = false;

    }

  }

  // MEU PERFIL

  openProfile(): void {
    this.userMenuOpen = false;
    // Vamos implementar posteriormente
    this.router.navigate(['/perfil']);

  }

  // CONFIGURAÇÕES

  openSettings(): void {
    this.userMenuOpen = false;
    // Vamos implementar posteriormente
    this.router.navigate(['/configuracoes']);

  }

  // LOGOUT

  logout(): void {
    this.userMenuOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
