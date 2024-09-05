import {ApiService, previewMovie, previewMovieDTO, responseMovieDTO, PreviewMovieMappers, PreviewMovieRepository} from '@movie/data';
import {SearchMovieRepository} from '@movie/data/repositories/search-movie.repository';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetSearchMoviesCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly searchMovieRepository: SearchMovieRepository = inject(SearchMovieRepository);
  private readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);

  public execute(query: string): void {
    this.searchMovieRepository.saveSearchMovie(query);
    this.api.getSearch( 'movie', query, 1, 'en').subscribe({
      next: (response: responseMovieDTO) => {
        const previewMovieList: Array<previewMovie> = response.results.map((previewMovie: previewMovieDTO) => PreviewMovieMappers.doDomain(previewMovie));
        this.previewMovieRepository.savePreviewMovies(previewMovieList);
      },
      error: () => {
        console.error('Unsuccessful request for a film list');
      }
    })
  }
}
