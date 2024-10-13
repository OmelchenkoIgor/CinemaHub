import {environment} from '@environments/environment';
import {Cinema} from '@data/entities';
import {MovieDTO} from '@data/dto';

export abstract class DetailMovieMappers {
  static doDomain(dto: MovieDTO, videoKey: string, cast: Array<string>, about: Array<string>): Cinema {

    const detailCinema  = {
      name: dto.title,
      release: dto.release_date.split('-')[0],
      description: dto.overview,
      genres: dto.genres.map(genre => genre.name),
      runtime: `${Math.floor(dto.runtime / 60)} h ${dto.runtime % 60} min`,
      video: videoKey ? `${environment.VIDEO_URL}?v=${videoKey}` : null,
      quality: 'HD',
      cast: cast,
      about: about
    }

    return new Cinema(detailCinema);
  }
}
