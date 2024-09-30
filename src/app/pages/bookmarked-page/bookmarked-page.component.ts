import { Component } from '@angular/core';
import {BookmarkedListComponent} from '@widgets/bookmarked-list';

@Component({
  selector: 'app-bookmarked-page',
  standalone: true,
  imports: [
    BookmarkedListComponent
  ],
  templateUrl: './bookmarked-page.component.html',
  styleUrl: './bookmarked-page.component.scss'
})
export class BookmarkedPageComponent {

}
