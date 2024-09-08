import {Routes} from '@angular/router';

export const route: Routes = [
  {
    path: '',
    loadComponent: () => import('@serial/pages/preview-serial-page/preview-serial-page.component')
  }
];
