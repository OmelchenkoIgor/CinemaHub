import {environment} from '@environments/environment';
import {previewSerialDTO} from '@content/serial';
import {previewCinema} from '@content/cinema';

export abstract class PreviewSerialMappers {
  static doDomain(dto: previewSerialDTO): previewCinema {
    const previewSerialProps = {
      id: dto.id,
      type: 'TV serial',
      title: dto.name,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.first_air_date.split('-')[0]
    }

    return new previewCinema(previewSerialProps);
  }
}
