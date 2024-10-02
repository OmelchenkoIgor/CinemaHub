import {PreviewListComponent} from '@widgets/preview-list';
import {PreviewCinemaRepository} from '@data/repositories';
import {NavigationEnd, Router} from '@angular/router';
import {CarouselComponent} from '@widgets/carousel';
import {SearchComponent} from '@features/search';
import {Component, inject} from '@angular/core';
import {TitlePipe} from '@shared/pipe';
import {Category} from '@shared/type';
import {filter} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  imports: [PreviewListComponent, TitlePipe, SearchComponent, CarouselComponent]
})
export class ContentPageComponent {
  private readonly router: Router = inject(Router);
  public readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

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
