import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BadgeVariant } from '../../types';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-badge',
  imports: [VpIcon, CommonModule],
  standalone: true,
  templateUrl: './vp-badge.html',
  styleUrl: './vp-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpBadge {
  @Input()
  variant: BadgeVariant = 'default';

  @Input()
  icon = '';

  @Input()
  rounded = true;

  @Input()
  small = false;

}
