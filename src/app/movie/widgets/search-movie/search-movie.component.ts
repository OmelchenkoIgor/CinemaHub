import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {GetMoviesCommand, GetSearchMoviesCommand} from '@movie/commands';
import {SearchInputComponent} from '@shared/components';
import {SearchMovieRepository} from '@movie/data';
import {PageMovieRepository} from '@movie/data';

@Component({
  standalone: true,
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.scss',
  imports: [SearchInputComponent]
})
export class SearchMovieComponent {
  private readonly getMoviesCommand: GetMoviesCommand = inject(GetMoviesCommand);
  private readonly getSearchMoviesCommand: GetSearchMoviesCommand = inject(GetSearchMoviesCommand);

  private readonly pageMovieRepository: PageMovieRepository = inject(PageMovieRepository);
  private readonly searchMovieRepository: SearchMovieRepository = inject(SearchMovieRepository);

  public searchChange: WritableSignal<string> = signal('');

  constructor() {
    effect(() => {
      if (this.searchChange().length) {
        this.getSearchMoviesCommand.execute(this.searchChange());
      }

      if (this.searchChange() === '') {
        this.searchMovieRepository.saveSearchMovie('');
        this.pageMovieRepository.saveNewPage(2)
        this.getMoviesCommand.execute();
      }
    }, {allowSignalWrites: true});
  }
}
