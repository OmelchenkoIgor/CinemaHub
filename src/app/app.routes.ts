import {BookmarkedPageComponent} from '@pages/bookmarked-page';
import {ContentPageComponent} from '@pages/content-page';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', component: ContentPageComponent},
  {path: 'movies', component: ContentPageComponent},
  {path: 'series', component: ContentPageComponent},
  {path: 'bookmarks', component: BookmarkedPageComponent}
];
