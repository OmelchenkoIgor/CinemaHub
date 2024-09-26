import {environment} from '@environments/environment';
import {previewCinema} from '@data/entities';
import {previewMovieDTO} from '@data/dto';


export abstract class PreviewMovieMappers {
  static doDomain(dto: previewMovieDTO): previewCinema {
    const previewMovieProps = {
      id: dto.id,
      type: 'Movie',
      title: dto.title,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.release_date.split('-')[0]
    }

    return new previewCinema(previewMovieProps);
  }
}
