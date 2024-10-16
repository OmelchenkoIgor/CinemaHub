import {Component, effect, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {PreviewCardComponent} from '@features/preview-card';
import {previewCinema} from '@data/entities';
import {BookmarkCommand} from '@commands';
import {CinemaType} from '@shared/type';

@Component({
  standalone: true,
  selector: 'app-bookmarked-list',
  templateUrl: './bookmarked-list.component.html',
  styleUrl: './bookmarked-list.component.scss',
  imports: [PreviewCardComponent]
})
export class BookmarkedListComponent {
  public type: InputSignal<CinemaType> = input.required();
  public list: WritableSignal<Array<previewCinema>> = signal([]);

  private readonly bookmark: BookmarkCommand = inject(BookmarkCommand);

  constructor() {
    effect(() => {
      this.list.set(this.bookmark.loadBookmarks().filter((item: previewCinema) => item.type === this.type()))
    }, {allowSignalWrites: true})
  }

}
