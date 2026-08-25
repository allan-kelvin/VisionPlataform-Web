import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VpToast } from "./shared/ui/vp-toast/vp-toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VpToast,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vision-platform-web');
}
