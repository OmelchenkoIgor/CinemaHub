import {BookmarkedListComponent} from '@widgets/bookmarked-list';
import {Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-bookmarked-page',
  templateUrl: './bookmarked-page.component.html',
  styleUrl: './bookmarked-page.component.scss',
  imports: [BookmarkedListComponent]
})
export class BookmarkedPageComponent {

}
