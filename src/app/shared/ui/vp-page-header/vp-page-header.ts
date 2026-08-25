import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-page-header',
  imports: [VpIcon, CommonModule],
  standalone: true,
  templateUrl: './vp-page-header.html',
  styleUrl: './vp-page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpPageHeader {

  @Input()
  icon = '';

  @Input()
  title = '';

  @Input()
  subtitle = '';
}
