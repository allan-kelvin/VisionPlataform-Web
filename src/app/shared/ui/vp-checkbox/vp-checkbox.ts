import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-checkbox',
  standalone: true,
  imports: [CommonModule, VpIcon],
  templateUrl: './vp-checkbox.html',
  styleUrl: './vp-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VpCheckbox),
      multi: true
    }
  ]
})
export class VpCheckbox implements ControlValueAccessor {

  @Input()
  checked = false;

  @Input()
  disabled = false;

  @Input()
  label = '';

  @Input()
  hint = '';

  @Input()
  error = '';

  @Output()
  checkedChange = new EventEmitter<boolean>();

  onChange: (value: boolean) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {

    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();

  }
}
