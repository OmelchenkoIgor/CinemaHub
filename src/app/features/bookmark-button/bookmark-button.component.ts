import {Component, inject, input, InputSignal} from '@angular/core';
import {previewCinema} from '@data/entities';
import {BookmarkCommand} from '@commands';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrl: './bookmark-button.component.scss',
  imports: [NgClass],
})
export class BookmarkButtonComponent {
  public content: InputSignal<previewCinema> = input.required();
  private readonly bookmark: BookmarkCommand = inject(BookmarkCommand);

  get isBookmarked(): boolean {
    return this.bookmark.isBookmarked(this.content());
  }

  public toggleBookmark(): void {
    this.bookmark.toggleBookmark(this.content());
  }
}
