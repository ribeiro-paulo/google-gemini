import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'google-gemini';
}
