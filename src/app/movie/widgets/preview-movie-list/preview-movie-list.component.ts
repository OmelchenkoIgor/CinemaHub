import {Component, computed, HostListener, inject, OnInit, Signal} from '@angular/core';
import {GetNextMoviesPageCommand} from '@movie/commands/get-next-movies-page-command';
import {previewMovie, PreviewMovieRepository} from '@movie/data';
import {PreviewCardComponent} from '@shared/components';
import {GetMoviesCommand} from '@movie/commands';

@Component({
  standalone: true,
  selector: 'app-preview-movie-list',
  templateUrl: './preview-movie-list.component.html',
  styleUrl: './preview-movie-list.component.scss',
  imports: [PreviewCardComponent]
})
export class PreviewMovieListComponent implements OnInit {
  private readonly getMoviesCommand: GetMoviesCommand = inject(GetMoviesCommand);
  private readonly getNextMoviesPageCommand: GetNextMoviesPageCommand = inject(GetNextMoviesPageCommand);

  protected readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);
  protected readonly previewMoviesList: Signal<Array<previewMovie>> = computed(() => this.previewMovieRepository.getPreviewMovies());

  ngOnInit(): void {
    this.getMoviesCommand.execute();
    this.getNextMoviesPageCommand.resetPage();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const bottomOfWindow: boolean = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (bottomOfWindow) {
      this.getNextMoviesPageCommand.execute();
    }
  }
}
