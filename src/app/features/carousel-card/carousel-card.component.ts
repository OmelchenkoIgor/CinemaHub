import {Component, input, InputSignal} from '@angular/core';
import {previewCinema} from '@data/entities';
import {NgStyle, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {BookmarkButtonComponent} from '@features/bookmark-button';
import {PlayButtonComponent} from '@features/play-button';

@Component({
  standalone: true,
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
  imports: [NgStyle, TitleCasePipe, RouterLink, BookmarkButtonComponent, PlayButtonComponent]
})
export class CarouselCardComponent {
  public readonly content: InputSignal<previewCinema> = input.required();

  public isValidPoster(posterUrl: string | null): boolean {
    return !!(posterUrl && posterUrl !== 'https://image.tmdb.org/t/p/w500null');
  }
}
