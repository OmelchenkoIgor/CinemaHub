import {Component, input, InputSignal} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {previewSerial} from '@serial/data';
import {previewMovie} from '@movie/data';

@Component({
  standalone: true,
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrl: './preview-card.component.scss',
  imports: [TitleCasePipe, RouterLink]
})
export class PreviewCardComponent {
  public content: InputSignal<previewMovie | previewSerial> = input.required();

  public isValidPoster(posterUrl: string | null): boolean {
    return !!(posterUrl && posterUrl !== 'https://image.tmdb.org/t/p/w500null');
  }
}
