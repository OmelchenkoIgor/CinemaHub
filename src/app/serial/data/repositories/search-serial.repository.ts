import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SearchSerialRepository {
  private searchSerial: WritableSignal<string> = signal('');

  public getSearchSerial(): boolean {
    return this.searchSerial() !== '';
  }

  public saveSearchSerial(moviesName: string): void {
    this.searchSerial.set(moviesName);
  }
}
