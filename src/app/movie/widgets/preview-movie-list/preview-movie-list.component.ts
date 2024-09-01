import {Component, computed, inject, OnInit, Signal} from '@angular/core';
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
  protected readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);
  protected readonly previewMoviesList: Signal<Array<previewMovie>> = computed(() => this.previewMovieRepository.getPreviewMovies());

  ngOnInit(): void {
    this.getMoviesCommand.execute();
  }
}
