import {previewCinema, previewCinemaProps} from '@data/entities';
import {environment} from '@environments/environment';
import {previewMovieDTO} from '@data/dto';


export abstract class PreviewMovieMappers {
  static doDomain(dto: previewMovieDTO): previewCinema {
    const previewMovieProps: previewCinemaProps = {
      id: dto.id,
      type: 'Movie',
      title: dto.title,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.release_date.split('-')[0]
    }

    return new previewCinema(previewMovieProps);
  }
}
