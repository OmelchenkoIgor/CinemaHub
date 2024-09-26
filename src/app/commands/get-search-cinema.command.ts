import {previewCinemaDTO, previewMovieDTO, previewSerialDTO, responseCinemaDTO, responseMovieDTO, responseSerialDTO} from '@data/dto';
import {PreviewCinemaMappers, PreviewMovieMappers, PreviewSerialMappers} from '@data/mappers';
import {PreviewCinemaRepository} from '@data/repositories';
import {Category, Language, Type} from '@shared/type';
import {inject, Injectable} from '@angular/core';
import {previewCinema} from '@data/entities';
import {ApiService} from '@data/services';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GetSearchCinemaCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  execute(type: Type, category: Category, query: string, page: number, language: Language): void {
    if (category === 'all') {
      category = 'multi';
    }

    this.api.getSearch(type, category, page, language, query).pipe(
      tap((response: responseCinemaDTO | responseMovieDTO | responseSerialDTO) => {
        let previewList: Array<previewCinema>;

        if (type === 'search' && category === 'multi' && 'results' in response) {
          const results: responseCinemaDTO = response as responseCinemaDTO;
          previewList = results.results.map((previewCinema: previewCinemaDTO) =>
            PreviewCinemaMappers.doDomain(previewCinema));

        } else if (type === 'search' && category === 'movie' && 'results' in response) {
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

        this.previewCinema.setPreviewCinema(previewList);
      })
    ).subscribe();
  }
}
