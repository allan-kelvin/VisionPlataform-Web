import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vp-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vp-icon.html',
  styleUrl: './vp-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpIcon {

  @Input()
  name = '';

  @Input()
  size = 20;

  @Input()
  color = 'currentColor';

  @Input()
  filled = false;

}
