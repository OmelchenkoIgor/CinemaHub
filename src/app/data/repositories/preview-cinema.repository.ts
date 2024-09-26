import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {previewCinema} from '@data/entities';

@Injectable({providedIn: 'root'})
export class PreviewCinemaRepository {
  private page: WritableSignal<number> = signal(2);
  private searchQuery: WritableSignal<string> = signal('');
  private previewCinemaList: WritableSignal<Array<previewCinema>> = signal([]);

  public setNewPage(newPage: number): void {
    this.page.set(newPage);
  }

  public setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  public setPreviewCinema(content: Array<previewCinema>): void {
    this.previewCinemaList.set(content);
  }

  public addPreviewCinema(content: Array<previewCinema>): void {
    this.previewCinemaList.set([...this.previewCinemaList(), ...content]);
  }

  public readonly isPage: Signal<number> = this.page.asReadonly();
  public readonly isSearchQuery: Signal<string> = this.searchQuery.asReadonly();
  public readonly isPreviewCinemaList: Signal<Array<previewCinema>> = this.previewCinemaList.asReadonly();
}
