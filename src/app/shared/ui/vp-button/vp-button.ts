
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonSize, ButtonVariant } from '../../types';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-button',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    VpIcon
  ],
  templateUrl: './vp-button.html',
  styleUrl: './vp-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpButton {

  @Input()
  label = '';

  @Input()
  variant: ButtonVariant = 'primary';

  @Input()
  size: ButtonSize = 'medium';

  @Input()
  icon?: string;

  @Input()
  iconPosition: 'left' | 'right' = 'left';

  @Input()
  loading = false;

  @Input()
  disabled = false;

  @Input()
  fullWidth = false;

  @Input()
  rounded = false;

  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';
}
