import {Routes} from '@angular/router';

export const route: Routes = [
  {
    path: '',
    loadComponent: () => import('@movie/pages/preview-movie-page/preview-movie-page.component')
  },
  {
    path: ':id',
    loadComponent: () => import('@movie/pages/detailed-movie-page/detailed-movie-page.component')
  }
];
