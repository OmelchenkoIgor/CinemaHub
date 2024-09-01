import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '@shared/components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavigationBarComponent]
})
export class AppComponent {

}
