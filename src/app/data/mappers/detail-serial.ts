import {environment} from '@environments/environment';
import {Cinema} from '@data/entities/cinema';
import {SerialDTO} from '@data/dto';

export abstract class DetailSerialMappers {
  static doDomain(dto: SerialDTO, videoKey: string, cast: any, about: any): Cinema {

    const detailCinema  = {
      name: dto.name,
      release: dto.first_air_date.split('-')[0],
      description: dto.overview,
      genres: dto.genres.map(genre => genre.name),
      runtime: `${Math.floor(dto.last_episode_to_air.runtime / 60)} h ${dto.last_episode_to_air.runtime % 60} min`,
      video: videoKey ? `${environment.VIDEO_URL}?v=${videoKey}` : null,
      quality: 'HD',
      cast: cast,
      about: about
    }

    return new Cinema(detailCinema);
  }
}
