import {ApiService, previewMovie, previewMovieDTO, responseMovieDTO, PreviewMovieMappers, PreviewMovieRepository} from '@movie/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetNextMoviesPageCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);

  private currentPage: number = 2;

  public execute(): void {
    this.api.getMovie(this.currentPage, 'movie', 'en').subscribe({
      next: (response: responseMovieDTO) => {
        const previewMovieList: Array<previewMovie> = response.results.map((previewMovie: previewMovieDTO) => PreviewMovieMappers.doDomain(previewMovie));
        this.previewMovieRepository.addPreviewMovies(previewMovieList);
        this.currentPage++;
      },
      error: () => {
        console.error('Unsuccessful request for a film list');
      }
    })
  }

  public resetPage(): void {
    this.currentPage = 2;
  }
}
