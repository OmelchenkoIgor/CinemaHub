import {BookmarkButtonComponent} from '@features/bookmark-button';
import {Component, input, InputSignal} from '@angular/core';
import {PlayButtonComponent} from '@features/play-button';
import {TitleCasePipe} from '@angular/common';
import {previewCinema} from '@data/entities';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrl: './preview-card.component.scss',
  imports: [TitleCasePipe, RouterLink, BookmarkButtonComponent, PlayButtonComponent]
})
export class PreviewCardComponent {
  public content: InputSignal<previewCinema> = input.required();

  public isValidPoster(posterUrl: string | null): boolean {
    return !!posterUrl &&
      posterUrl !== 'https://image.tmdb.org/t/p/w500null' &&
      posterUrl !== 'https://image.tmdb.org/t/p/w500undefined';
  }
}
