import {ApiService, previewMovie, previewMovieDTO, responseMovieDTO, PreviewMovieMappers, PreviewMovieRepository, PageMovieRepository} from '@movie/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetNextMoviesPageCommand {
  private readonly api: ApiService = inject(ApiService);

  private readonly pageMovieRepository: PageMovieRepository = inject(PageMovieRepository);
  private readonly previewMovieRepository: PreviewMovieRepository = inject(PreviewMovieRepository);

  public execute(): void {
    this.api.getMovie(this.pageMovieRepository.getPage(), 'movie', 'en').subscribe({
      next: (response: responseMovieDTO) => {
        const previewMovieList: Array<previewMovie> = response.results.map((previewMovie: previewMovieDTO) => PreviewMovieMappers.doDomain(previewMovie));
        this.previewMovieRepository.addPreviewMovies(previewMovieList);
        this.pageMovieRepository.saveNewPage(this.pageMovieRepository.getPage() + 1);
      },
      error: () => {
        console.error('Unsuccessful request for a film list');
      }
    })
  }
}
