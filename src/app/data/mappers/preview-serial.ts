import {environment} from '@environments/environment';
import {previewCinema} from '@data/entities';
import {previewSerialDTO} from '@data/dto';


export abstract class PreviewSerialMappers {
  static doDomain(dto: previewSerialDTO): previewCinema {
    const previewSerialProps = {
      id: dto.id,
      type: 'TV Serial',
      title: dto.name,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.first_air_date.split('-')[0]
    }

    return new previewCinema(previewSerialProps);
  }
}
