import {environment} from '@environments/environment';
import {previewMovieDTO} from '@content/movie';
import {previewCinema} from '@content/cinema';

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
