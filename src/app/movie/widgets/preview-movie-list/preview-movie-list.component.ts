import {Component, computed, effect, HostListener, inject, OnDestroy, Signal} from '@angular/core';
import {PageMovieRepository, previewMovie, PreviewMovieRepository} from '@movie/data';
import {LoadingSpinnerComponent, PreviewCardComponent} from '@shared/components';
import {GetNextMoviesPageCommand} from '@movie/commands';
import {SearchMovieRepository} from '@movie/data';

@Component({
  standalone: true,
  selector: 'app-preview-movie-list',
  templateUrl: './preview-movie-list.component.html',
  styleUrl: './preview-movie-list.component.scss',
  imports: [PreviewCardComponent, LoadingSpinnerComponent]
})
export class PreviewMovieListComponent implements OnDestroy {
  private readonly getNextMoviesPageCommand: GetNextMoviesPageCommand = inject(GetNextMoviesPageCommand);

  private readonly pageMovieRepository: PageMovieRepository = inject(PageMovieRepository);
  private readonly searchMovieRepository: SearchMovieRepository = inject(SearchMovieRepository);
  protected readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);
  protected readonly previewMoviesList: Signal<Array<previewMovie>> = computed(() => this.previewMovieRepository.getPreviewMovies());

  protected isLoading: boolean = true;

  constructor() {
    effect(() => {
      if (this.previewMoviesList() && this.previewMoviesList().length) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.pageMovieRepository.saveNewPage(2);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const threshold: number = document.body.offsetHeight * 0.9;

    if (scrollPosition >= threshold && !this.isLoading && !this.searchMovieRepository.getSearchMovie()) {
      this.isLoading = true;
      this.getNextMoviesPageCommand.execute();
    }
  }
}
