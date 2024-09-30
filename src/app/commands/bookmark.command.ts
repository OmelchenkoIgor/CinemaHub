import {WritableSignal, signal} from '@angular/core';
import {previewCinema} from '@data/entities';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BookmarkCommand {
  private cinemaData: WritableSignal<Array<previewCinema>> = signal(this.loadBookmarks());

  private loadBookmarks(): Array<previewCinema> {
    const cinemaData: string | null = localStorage.getItem('CinemaData');
    return cinemaData ? JSON.parse(cinemaData) : [];
  }

  public isBookmarked(cinema: previewCinema): boolean {
    return this.cinemaData().some((item: previewCinema) => this.objectsAreEqual(item, cinema));
  }

  public toggleBookmark(cinema: previewCinema): void {
    let cinemaDataArray: Array<previewCinema> = this.cinemaData();
    const objectIndex: number = cinemaDataArray.findIndex((item: previewCinema) => this.objectsAreEqual(item, cinema));

    if (objectIndex !== -1) {
      cinemaDataArray.splice(objectIndex, 1);
    } else {
      cinemaDataArray.push(cinema);
    }

    localStorage.setItem('CinemaData', JSON.stringify(cinemaDataArray));
    this.cinemaData.set([...cinemaDataArray]);
  }

  private objectsAreEqual(obj1: previewCinema, obj2: previewCinema): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
