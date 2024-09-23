import {ContentPageComponent} from '@pages/content-page/content-page.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', component: ContentPageComponent},
  {path: 'movies', component: ContentPageComponent},
  {path: 'series', component: ContentPageComponent}
];
