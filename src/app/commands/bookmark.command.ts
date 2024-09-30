import {WritableSignal, signal} from '@angular/core';
import {previewCinema} from '@data/entities';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BookmarkCommand {
  private cinemaData: WritableSignal<Array<previewCinema>> = signal(this.loadBookmarks());

  public loadBookmarks(): Array<previewCinema> {
    const cinemaData: string | null = localStorage.getItem('CinemaData');
    return cinemaData ? JSON.parse(cinemaData) : [];
  }

  public isBookmarked(cinema: previewCinema): boolean {
    const unwrappedCinema = (cinema as any).source ? (cinema as any).source : cinema;

    return this.cinemaData().some(
      (item: previewCinema) =>
        item.id === unwrappedCinema.id && item.type === unwrappedCinema.type
    );
  }

  public toggleBookmark(cinema: previewCinema): void {
    let cinemaDataArray: Array<previewCinema> = this.cinemaData();

    const unwrappedCinema = (cinema as any).source ? (cinema as any).source : cinema;

    const objectIndex: number = cinemaDataArray.findIndex(
      (item: previewCinema) => item.id === unwrappedCinema.id
    );

    if (objectIndex !== -1) {
      cinemaDataArray.splice(objectIndex, 1);
    } else {
      cinemaDataArray.push(unwrappedCinema);
    }

    localStorage.setItem('CinemaData', JSON.stringify(cinemaDataArray));
    this.cinemaData.set([...cinemaDataArray]);
  }
}
