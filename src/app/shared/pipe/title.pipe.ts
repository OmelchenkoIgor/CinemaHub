import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'title'})
export class TitlePipe implements PipeTransform {
  transform(value: string): string {
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
