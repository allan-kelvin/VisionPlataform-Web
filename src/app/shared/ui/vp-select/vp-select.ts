import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../interfaces';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-select',
  imports: [CommonModule, VpIcon],
  templateUrl: './vp-select.html',
  styleUrl: './vp-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VpSelect),
      multi: true
    }
  ]
})
export class VpSelect implements ControlValueAccessor {

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  isOpen = false;

  @Input()
  label = '';

  @Input()
  placeholder = 'Selecione';

  @Input()
  options: SelectOption[] = [];

  @Input()
  value: string | number | null = null;

  @Input()
  icon = '';

  @Input()
  required = false;

  @Input()
  disabled = false;

  @Input()
  error = '';

  @Input()
  hint = '';

  @Output()
  valueChange = new EventEmitter<string | number>();

  get selectedOption(): SelectOption | undefined {

    return this.options.find(x => x.value === this.value);
  }

  toggle(): void {

    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;

  }

  writeValue(value: any): void {
    this.value = value;

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

  onSelect(event: Event): void {

    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
