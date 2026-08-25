import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-password-input',
  standalone: true,
  imports: [VpIcon, CommonModule, FormsModule],
  templateUrl: './vp-password-input.html',
  styleUrl: './vp-password-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VpPasswordInput),
      multi: true
    }
  ]
})
export class VpPasswordInput implements ControlValueAccessor {

  label = '';
  value = '';

  @Input()
  placeholder = 'Digite sua senha';

  @Input() readonly = false;

  @Input()
  hint = '';

  @Input()
  error = '';

  @Input()
  required = false;

  @Input()
  disabled = false;

  @Input()
  showStrength = false;

  hidePassword = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  //===========================
  // SCORE
  //===========================

  get score(): number {

    let score = 0;

    if (this.value.length >= 8) score++;

    if (/[A-Z]/.test(this.value)) score++;

    if (/[a-z]/.test(this.value)) score++;

    if (/[0-9]/.test(this.value)) score++;

    if (/[^A-Za-z0-9]/.test(this.value)) score++;

    return score;

  }

  //===========================
  // LABEL
  //===========================

  get strengthLabel(): string {

    if (this.score <= 1)
      return 'Fraca';

    if (this.score <= 3)
      return 'Média';

    if (this.score === 4)
      return 'Boa';

    return 'Forte';

  }

  //===========================
  // CSS CLASS
  //===========================

  get strengthClass(): string {

    if (this.score <= 1)
      return 'weak';

    if (this.score <= 3)
      return 'medium';

    if (this.score === 4)
      return 'good';

    return 'strong';
  }

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
