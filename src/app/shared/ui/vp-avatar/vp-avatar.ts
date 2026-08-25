import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-avatar',
  standalone: true,
  imports: [VpIcon, CommonModule],
  templateUrl: './vp-avatar.html',
  styleUrl: './vp-avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpAvatar {


  @Input()
  src = '';

  @Input()
  initials = '';

  @Input()
  icon = 'person';

  @Input()
  online = false;

  @Input()
  border = true;

  @Input()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  imageError = false;

  onImageError(): void {
    this.imageError = true;
  }
}
