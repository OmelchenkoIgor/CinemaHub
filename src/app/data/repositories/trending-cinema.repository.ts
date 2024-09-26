import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {previewCinema} from '@data/entities';

@Injectable({providedIn: 'root'})
export class TrendingCinemaRepository {
  private trendingCinemaList: WritableSignal<Array<previewCinema>> = signal([]);

  public setTrendingCinema(content: Array<previewCinema>): void {
    this.trendingCinemaList.set(content);
  }

  public readonly isTrendingCinemaList: Signal<Array<previewCinema>> = this.trendingCinemaList.asReadonly();
}
