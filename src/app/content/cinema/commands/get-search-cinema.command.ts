import {previewCinema, ApiService, Category, Language, PreviewCinemaRepository, responseCinemaDTO, Type} from '@content/cinema';
import {previewSerialDTO, PreviewSerialMappers, responseSerialDTO} from '@content/serial';
import {previewMovieDTO, PreviewMovieMappers, responseMovieDTO} from '@content/movie';
import {inject, Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GetSearchCinemaCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  execute(type: Type, category: Category, query: string, page: number, language: Language): void {
    this.api.getSearch(type, category, page, language, query).pipe(
      tap((response: responseCinemaDTO | responseMovieDTO | responseSerialDTO) => {
        let previewList: Array<previewCinema>;

        if (type === 'search' && category === 'movie' && 'results' in response) {
          const results: responseMovieDTO = response as responseMovieDTO;
          previewList = results.results.map((previewMovie: previewMovieDTO) =>
            PreviewMovieMappers.doDomain(previewMovie));

        } else if (type === 'search' && category === 'tv' && 'results' in response) {
          const results: responseSerialDTO = response as responseSerialDTO;
          previewList = results.results.map((previewSerial: previewSerialDTO) =>
            PreviewSerialMappers.doDomain(previewSerial));

        } else {
          return;
        }

        this.previewCinema.savePreviewCinema(previewList);
      })
    ).subscribe();
  }
}
