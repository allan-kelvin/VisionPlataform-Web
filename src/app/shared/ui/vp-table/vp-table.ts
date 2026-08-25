import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VpButton } from '../vp-button/vp-button';
import { VpIcon } from '../vp-icon/vp-icon';
import { TableColumn } from './models/table-column.interface';

@Component({
  selector: 'vp-table',
  standalone: true,
  imports: [CommonModule, VpIcon, VpButton],
  templateUrl: './vp-table.html',
  styleUrl: './vp-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpTable {
  @Input()
  columns: TableColumn[] = [];

  @Input()
  data: any[] = [];

  @Input()
  title = '';

  @Input()
  showHeader = true;

  @Input()
  showSearch = true;

  @Input()
  showNewButton = false;

  @Input()
  newButtonText = 'Novo';
}
