import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PageMovieRepository {
  private currentPage: WritableSignal<number> = signal(2);

  public getPage(): number {
    return this.currentPage();
  }

  public saveNewPage(page: number): void {
    this.currentPage.set(page);
  }
}
