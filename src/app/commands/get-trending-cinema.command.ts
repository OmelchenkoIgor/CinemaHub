import {previewCinemaDTO, responseCinemaDTO} from '@data/dto';
import {TrendingCinemaRepository} from '@data/repositories';
import {PreviewCinemaMappers} from '@data/mappers';
import {inject, Injectable} from '@angular/core';
import {previewCinema} from '@data/entities';
import {ApiService} from '@data/services';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GetTrendingCinemaCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly trendingCinema: TrendingCinemaRepository = inject(TrendingCinemaRepository);

  execute(): void {
    this.api.getTrending('trending', 'all', 'en', 'week').pipe(
      tap((response: responseCinemaDTO) => {
        let previewList: Array<previewCinema>;

        const results: responseCinemaDTO = response as responseCinemaDTO;
        previewList = results.results.map((previewCinema: previewCinemaDTO) =>
          PreviewCinemaMappers.doDomain(previewCinema));

        this.trendingCinema.setTrendingCinema(previewList)
      })
    ).subscribe();
  }
}
