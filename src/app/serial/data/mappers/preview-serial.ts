import {environment} from '../../../../environments/environment';
import {previewSerial, previewSerialDTO} from '@serial/data';

export abstract class PreviewSerialMappers {
  static doDomain(dto: previewSerialDTO): previewSerial {
    const previewSerialProps = {
      id: dto.id,
      type: 'serial',
      title: dto.name,
      poster: environment.IMG_URL + dto.poster_path,
      release: dto.first_air_date.split('-')[0]
    }

    return new previewSerial(previewSerialProps);
  }
}
