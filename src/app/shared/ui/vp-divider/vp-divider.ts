import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vp-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vp-divider.html',
  styleUrl: './vp-divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpDivider {
  @Input()
  text = '';

}
