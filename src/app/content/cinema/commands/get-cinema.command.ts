import {ApiService, previewCinema, previewCinemaDTO, PreviewCinemaMappers, PreviewCinemaRepository, responseCinemaDTO} from '@content/cinema/data';
import {previewSerialDTO, PreviewSerialMappers, responseSerialDTO} from '@content/serial';
import {previewMovieDTO, PreviewMovieMappers, responseMovieDTO} from '@content/movie';
import {Category, Language, Type} from '@content/cinema';
import {inject, Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GetCinemaCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  execute(type: Type, category: Category, page: number, language: Language): void {
    this.api.getCinema(type, category, page, language).pipe(
      tap((response: responseCinemaDTO | responseMovieDTO | responseSerialDTO) => {
        let previewList: Array<previewCinema>;

        if (type === 'trending' && category === 'all' && 'results' in response) {
          const results: responseCinemaDTO = response as responseCinemaDTO;
          previewList = results.results.map((previewCinema: previewCinemaDTO) =>
            PreviewCinemaMappers.doDomain(previewCinema));

        } else if (type === 'discover' && category === 'movie' && 'results' in response) {
          const results: responseMovieDTO = response as responseMovieDTO;
          previewList = results.results.map((previewMovie: previewMovieDTO) =>
            PreviewMovieMappers.doDomain(previewMovie));

        } else if (type === 'discover' && category === 'tv' && 'results' in response) {
          const results: responseSerialDTO = response as responseSerialDTO;
          previewList = results.results.map((previewSerial: previewSerialDTO) =>
            PreviewSerialMappers.doDomain(previewSerial));

        } else {
          return;
        }

        if (page === 1) {
          this.previewCinema.savePreviewCinema(previewList);
        } else {
          this.previewCinema.addPreviewCinema(previewList);
        }

      })
    ).subscribe();
  }
}
