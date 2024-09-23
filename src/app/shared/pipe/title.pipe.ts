import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '@content/cinema';

@Pipe({standalone: true, name: 'title'})
export class TitlePipe implements PipeTransform {
  transform(value: Category): string {
    switch (value) {
      case 'all':
        return 'Recommended for you';
      case 'movie':
        return 'Movies';
      case 'tv':
        return 'TV Series';
      default:
        return value;
    }
  }
}
