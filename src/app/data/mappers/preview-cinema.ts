import {previewCinema, previewCinemaProps} from '@data/entities';
import {environment} from '@environments/environment';
import {previewCinemaDTO} from '@data/dto';

export abstract class PreviewCinemaMappers {
  static doDomain(dto: previewCinemaDTO): previewCinema {
    const releaseDate: string | undefined = dto.first_air_date || dto.release_date;
    const releaseYear: string = releaseDate ? releaseDate.split('-')[0] : 'Unknown';

    const previewCinemaProps: previewCinemaProps = {
      id: dto.id,
      type: dto.media_type === 'tv' ? 'TV Serial' : 'Movie',
      title: dto.name ?? dto.title ?? 'Unknown Title',
      poster: environment.IMG_URL + dto.poster_path,
      release: releaseYear
    };

    return new previewCinema(previewCinemaProps);
  }
}
