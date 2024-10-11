import {DetailCinemaRepository} from '@data/repositories';
import {DetailMovieMappers, DetailSerialMappers} from '@data/mappers';
import {inject, Injectable} from '@angular/core';
import {MovieDTO, SerialDTO} from '@data/dto';
import {Cinema} from '@data/entities/cinema';
import {ApiService} from '@data/services';
import {Category} from '@shared/type';
import {tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GetDetailInfoCinemaCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly detailCinemaRepository: DetailCinemaRepository = inject(DetailCinemaRepository);

  execute(type: Category, id: string): void {
    this.api.getDetail(type, id, 'en').pipe(
      tap((response: MovieDTO | SerialDTO) => {
        let detailCinema: Cinema;
        const results: MovieDTO | SerialDTO = response as MovieDTO | SerialDTO;

        forkJoin({
          videoResponse: this.api.getMovieVideos(type, id),
          castResponse: this.api.getMovieCast(type, id),
          aboutResponse: this.api.getAboutData(type, id)
        }).pipe(
          tap(({videoResponse, castResponse, aboutResponse}) => {
            const videoKey = videoResponse.results.length > 0 ? videoResponse.results[0].key : null;
            const cast = castResponse.cast.slice(0, 10).map((actor: any) => actor.name);
            const about = aboutResponse?.keywords?.length > 0
              ? aboutResponse.keywords.slice(0, 10).map((keyword: any) => keyword.name)
              : (aboutResponse?.results?.length > 0
                ? aboutResponse.results.slice(0, 10).map((keyword: any) => keyword.name)
                : []);

            if (type === 'movie') {
              if (results as MovieDTO) {
                detailCinema = DetailMovieMappers.doDomain(results as MovieDTO, videoKey, cast, about);
              }
            }

            if (type === 'tv') {
              if (results as SerialDTO) {
                detailCinema = DetailSerialMappers.doDomain(results as SerialDTO, videoKey, cast, about);
              }
            }

            this.detailCinemaRepository.setDetailCinema(detailCinema);
          })
        ).subscribe();

      })
    ).subscribe();
  }
}
