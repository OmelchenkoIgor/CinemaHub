import {Component, computed, effect, HostListener, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {GetNextMoviesPageCommand} from '@movie/commands/get-next-movies-page-command';
import {LoadingSpinnerComponent, PreviewCardComponent} from '@shared/components';
import {previewMovie, PreviewMovieRepository} from '@movie/data';
import {GetMoviesCommand} from '@movie/commands';

@Component({
  standalone: true,
  selector: 'app-preview-movie-list',
  templateUrl: './preview-movie-list.component.html',
  styleUrl: './preview-movie-list.component.scss',
  imports: [PreviewCardComponent, LoadingSpinnerComponent]
})
export class PreviewMovieListComponent implements OnInit, OnDestroy {
  private readonly getMoviesCommand: GetMoviesCommand = inject(GetMoviesCommand);
  private readonly getNextMoviesPageCommand: GetNextMoviesPageCommand = inject(GetNextMoviesPageCommand);

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

  ngOnInit(): void {
    this.getMoviesCommand.execute();
  }

  ngOnDestroy(): void {
    this.getNextMoviesPageCommand.resetPage();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const threshold: number = document.body.offsetHeight * 0.9;

    if (scrollPosition >= threshold && !this.isLoading) {
      this.isLoading = true;
      this.getNextMoviesPageCommand.execute();
    }
  }
}
