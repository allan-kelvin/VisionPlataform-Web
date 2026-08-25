import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-toast',
  standalone: true,
  imports: [CommonModule, VpIcon],
  templateUrl: './vp-toast.html',
  styleUrl: './vp-toast.scss',
})
export class VpToast {
  readonly notification = inject(NotificationService);

  icon(type: string): string {

    switch (type) {

      case 'success':
        return 'check_circle';

      case 'error':
        return 'cancel';

      case 'warning':
        return 'warning';

      default:
        return 'info';
    }
  }
}
