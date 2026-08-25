import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../../shared/models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private counter = 0;
  private readonly _toasts = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts.asObservable();

  show(message: string, type: ToastType = 'info') {

    const toast: Toast = {
      id: ++this.counter,
      message,
      type
    };

    const list = [...this._toasts.value, toast];
    this._toasts.next(list);

    setTimeout(() => {
      this.remove(toast.id);
    }, 5000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  remove(id: number) {
    this._toasts.next(
      this._toasts.value.filter(x => x.id !== id)
    );
  }
}
