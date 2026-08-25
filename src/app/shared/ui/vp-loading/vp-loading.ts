import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vp-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vp-loading.html',
  styleUrl: './vp-loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpLoading {

  @Input()
  size = 24;

  @Input()
  color = '#16D98F';
}
