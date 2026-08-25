import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VpIcon,
  ],
  templateUrl: './vp-input.html',
  styleUrl: './vp-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VpInput),
      multi: true
    }
  ]
})
export class VpInput implements ControlValueAccessor {

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  value = '';

  @Input()
  type = 'text';

  @Input()
  icon = '';

  @Input()
  hint = '';

  @Input()
  error = '';

  @Input()
  disabled = false;

  @Input()
  readonly = false;

  @Input()
  required = false;

  writeValue(value: string): void {

    this.value = value ?? '';

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

  onInput(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.value = value;

    this.onChange(value);

  }

  onBlur(): void {
    this.onTouched();
  }
}
