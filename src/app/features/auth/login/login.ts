import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { VpButton } from '../../../shared/ui/vp-button/vp-button';
import { VpCheckbox } from '../../../shared/ui/vp-checkbox/vp-checkbox';
import { VpDivider } from '../../../shared/ui/vp-divider/vp-divider';
import { VpIcon } from '../../../shared/ui/vp-icon/vp-icon';
import { VpInput } from '../../../shared/ui/vp-input/vp-input';
import { VpPasswordInput } from '../../../shared/ui/vp-password-input/vp-password-input';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    VpInput,
    VpPasswordInput,
    VpCheckbox,
    VpButton,
    VpDivider,
    VpIcon
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);


  email = '';
  password = '';
  remember = false;
  loading = false;

  login(): void {

    if (!this.email.trim()) {
      this.notification.warning(
        'Informe seu e-mail.'
      );
      return;
    }

    if (!this.password.trim()) {
      this.notification.warning(
        'Informe sua senha.'
      );
      return;
    }

    this.loading = true;
    this.auth.login({

      email: this.email,
      password: this.password

    }).subscribe({

      next: () => {

        this.loading = false;
        this.notification.success(
          'Login realizado com sucesso.'
        );
        this.router.navigate(['/dashboard']);
      },

      error: () => {

        this.loading = false;
        this.notification.error(
          'E-mail ou senha inválidos.'
        );
      }
    });
  }
}
