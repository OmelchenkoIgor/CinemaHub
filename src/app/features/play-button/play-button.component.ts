import {Component, input, InputSignal} from '@angular/core';
import {previewCinema} from '@data/entities';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
  imports: [RouterLink]
})
export class PlayButtonComponent {
  public content: InputSignal<previewCinema> = input.required();
}
