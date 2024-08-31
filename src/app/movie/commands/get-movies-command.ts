import {ApiService, previewMovie, previewMovieDTO, responseMovieDTO, PreviewMovieMappers, PreviewMovieRepository} from '@movie/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetMoviesCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);

  public execute(): void {
    this.api.getMovie(1, 'movie', 'en').subscribe({
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
