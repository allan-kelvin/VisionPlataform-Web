import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vp-card',
  imports: [],
  templateUrl: './vp-card.html',
  styleUrl: './vp-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpCard {

  @Input()
  title = '';

  @Input()
  subtitle = '';

  @Input()
  padding = true;

}
