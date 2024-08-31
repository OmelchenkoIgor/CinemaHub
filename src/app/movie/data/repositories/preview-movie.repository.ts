import {Injectable, signal, WritableSignal} from '@angular/core';
import {previewMovie} from '@movie/data';

@Injectable({providedIn: 'root'})
export class PreviewMovieRepository {
  private previewMovieList: WritableSignal<Array<previewMovie>> = signal([]);

  public getPreviewMovies(): Array<previewMovie> {
    return this.previewMovieList();
  }

  public savePreviewMovies(movies: Array<previewMovie>): void {
    this.previewMovieList.set(movies);
  }
}
