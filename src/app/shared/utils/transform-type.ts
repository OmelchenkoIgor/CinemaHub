import {CinemaType} from '@shared/type';

export function transformType(type: CinemaType): string {
  if (type === 'Movie') {
    return 'movie';
  } else if (type === 'TV Serial') {
    return 'serial';
  }

  return type as string;
}
