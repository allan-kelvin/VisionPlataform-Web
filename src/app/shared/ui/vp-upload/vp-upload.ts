import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { VpButton } from '../vp-button/vp-button';
import { VpIcon } from '../vp-icon/vp-icon';

@Component({
  selector: 'vp-upload',
  standalone: true,
  imports: [VpIcon, CommonModule, VpButton],
  templateUrl: './vp-upload.html',
  styleUrl: './vp-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpUpload {

  @Input()
  title = 'Enviar arquivo';

  @Input()
  subtitle = 'JPG, PNG ou WEBP';

  @Input()
  maxFileSize = 2 * 1024 * 1024;

  @Input()
  allowedExtensions = ['image/jpeg', 'image/png', 'image/webp'];

  @Input()
  maxSize = 'Máx. 2MB';

  @Input()
  accept = 'image/*';

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;
  preview: string | null = null;
  fileName = '';
  error = '';
  dragging = false;

  openFilePicker() {

    this.fileInput.nativeElement.click();

  }

  loadFile(file: File) {

    this.error = '';

    if (!this.allowedExtensions.includes(file.type)) {

      this.error = 'Formato inválido.';

      return;

    }

    if (file.size > this.maxFileSize) {

      this.error = 'Arquivo maior que o permitido.';

      return;

    }

    this.fileName = file.name;

    const reader = new FileReader();

    reader.onload = () => {

      this.preview = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length)
      return;

    this.loadFile(input.files[0]);

  }

  removeImage() {

    this.preview = null;

    this.fileName = '';

    this.error = '';

    this.fileInput.nativeElement.value = '';

  }

  changeImage() {

    this.openFilePicker();

  }

  onDragOver(event: DragEvent) {

    event.preventDefault();

    this.dragging = true;

  }

  onDragLeave() {

    this.dragging = false;

  }

  onDrop(event: DragEvent) {

    event.preventDefault();

    this.dragging = false;

    if (event.dataTransfer?.files.length) {

      this.loadFile(event.dataTransfer.files[0]);

    }
  }
}
