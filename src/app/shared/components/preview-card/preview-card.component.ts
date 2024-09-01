import {Component, input, InputSignal} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {previewMovie} from '@movie/data';

@Component({
  standalone: true,
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrl: './preview-card.component.scss',
  imports: [TitleCasePipe]
})
export class PreviewCardComponent {
  public content: InputSignal<previewMovie> = input.required();
}
