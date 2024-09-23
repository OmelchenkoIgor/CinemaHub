import {PreviewListComponent} from '@widgets/preview-list/preview-list.component';
import {SearchComponent} from '@widgets/search/search.component';
import {NavigationEnd, Router} from '@angular/router';
import {Component, inject} from '@angular/core';
import {Category} from '@content/cinema';
import {TitlePipe} from '@shared/pipe';
import {filter} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  imports: [PreviewListComponent, TitlePipe, SearchComponent]
})
export class ContentPageComponent {
  private readonly router: Router = inject(Router);

  public currentUrl: Category = 'all';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url: string = this.router.url;

      if (url === '/') {
        this.currentUrl = 'all';
      } else if (url === '/movies') {
        this.currentUrl = 'movie';
      } else if (url === '/series') {
        this.currentUrl = 'tv';
      }
    });
  }
}
