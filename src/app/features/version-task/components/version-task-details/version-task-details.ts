import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VersionResponse } from '../../../../core/versions/models/version-response';

@Component({
  selector: 'app-version-task-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './version-task-details.html',
  styleUrl: './version-task-details.scss',
})
export class VersionTaskDetails {
  @Input() version: VersionResponse | null = null;
}
