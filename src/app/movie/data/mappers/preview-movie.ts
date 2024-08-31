import {environment} from '../../../../environments/environment';
import {previewMovie, previewMovieDTO} from '@movie/data';

export abstract class PreviewMovieMappers {
  static doDomain(dto: previewMovieDTO): previewMovie {
    const previewMovieProps = {
      id: dto.id,
      type: 'movie',
      title: dto.title,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.release_date.split('-')[0]
    }

    return new previewMovie(previewMovieProps);
  }
}
