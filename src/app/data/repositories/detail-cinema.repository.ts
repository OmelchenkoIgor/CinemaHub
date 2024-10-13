import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {Cinema} from '@data/entities/cinema';

@Injectable({providedIn: 'root'})
export class DetailCinemaRepository {
  private detailCinema: WritableSignal<Cinema | null> = signal(null);

  public setDetailCinema(cinema: Cinema | null): void {
    this.detailCinema.set(cinema);
  }

  public readonly isDetailCinema: Signal<Cinema | null> = this.detailCinema.asReadonly();
}
