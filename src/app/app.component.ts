import {NavigationBarComponent} from '@shared/components';
import {RouterOutlet} from '@angular/router';
import {Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavigationBarComponent]
})
export class AppComponent {

}
