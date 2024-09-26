import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '@shared/type';

@Pipe({standalone: true, name: 'title'})
export class TitlePipe implements PipeTransform {
  transform(value: Category): string {
    switch (value) {
      case 'all':
        return 'Recommended for you';
      case "multi":
        return 'movies or TV series'
      case 'movie':
        return 'Movies';
      case 'tv':
        return 'TV Series';
      default:
        return value;
    }
  }
}
