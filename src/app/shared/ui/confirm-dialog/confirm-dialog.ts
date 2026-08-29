import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-confirm-dialog',
  imports: [VpIcon],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {


  // CONTROLE

  @Input()
  open = false;


  // CONTEÚDO

  @Input()
  title = 'Confirmar ação';


  @Input()
  message = 'Deseja realmente realizar esta ação?';


  @Input()
  highlightText = '';


  @Input()
  warningMessage = 'Esta ação não poderá ser desfeita.';


  // BOTÕES

  @Input()
  confirmText = 'Confirmar';


  @Input()
  cancelText = 'Cancelar';


  // ÍCONE

  @Input()
  icon = 'delete';


  // EVENTOS

  @Output()
  confirmed = new EventEmitter<void>();


  @Output()
  cancelled = new EventEmitter<void>();


  @Output()
  closed = new EventEmitter<void>();

  // CONFIRMAR

  confirm(): void {

    this.confirmed.emit();

  }


  // CANCELAR

  cancel(): void {

    this.cancelled.emit();

    this.closed.emit();

  }


  // FECHAR

  close(): void {

    this.closed.emit();

  }


  // BACKDROP

  onBackdropClick(event: MouseEvent): void {

    if (event.target === event.currentTarget) {

      this.close();

    }

  }

}
