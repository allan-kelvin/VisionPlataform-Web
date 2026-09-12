import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VersionResponse } from '../../../../core/versions/models/version-response';

@Component({
  selector: 'app-version-task-cards',
  standalone: true,
  imports: [

  ],
  templateUrl: './version-task-cards.html',
  styleUrl: './version-task-cards.scss',
})
export class VersionTaskCards {

  @Input() versions: VersionResponse[] = [];

  @Input() selectedVersion: VersionResponse | null = null;

  @Output() versionSelected =
    new EventEmitter<VersionResponse>();


  selectVersion(version: VersionResponse): void {

    this.versionSelected.emit(version);

  }

}
