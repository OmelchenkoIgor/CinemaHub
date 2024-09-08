import {HomePageComponent} from '@pages/home-page/home-page.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'movies',
    loadChildren: () => import('./movie').then(m => m.route)
  },
  {
    path: 'series',
    loadChildren: () => import('./serial').then(m => m.route)
  }
];
