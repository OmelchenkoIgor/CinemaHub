import {previewCinema, previewCinemaDTO} from '@content/cinema/data';
import {environment} from '@environments/environment';

export abstract class PreviewCinemaMappers {
  static doDomain(dto: previewCinemaDTO): previewCinema {
    const releaseDate = dto.first_air_date || dto.release_date;
    const releaseYear = releaseDate ? releaseDate.split('-')[0] : 'Unknown';

    const previewCinemaProps = {
      id: dto.id,
      type: dto.media_type === 'tv' ? 'TV serial' : 'Movie',
      title: dto.name ?? dto.title ?? 'Unknown Title',
      poster: environment.IMG_URL + dto.poster_path,
      release: releaseYear
    };

    return new previewCinema(previewCinemaProps);
  }
}
