import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SearchMovieRepository {
  private searchMovie: WritableSignal<string> = signal('');

  public getSearchMovie(): boolean {
    return this.searchMovie() !== '';
  }

  public saveSearchMovie(moviesName: string): void {
    this.searchMovie.set(moviesName);
  }
}
