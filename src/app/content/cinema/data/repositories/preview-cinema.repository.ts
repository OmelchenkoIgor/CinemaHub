import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {previewCinema} from '@content/cinema';

@Injectable({providedIn: 'root'})
export class PreviewCinemaRepository {
  private page: WritableSignal<number> = signal(2);
  private searchQuery: WritableSignal<string> = signal('');
  private previewCinemaList: WritableSignal<Array<previewCinema>> = signal([]);

  public saveNewPage(newPage: number): void {
    this.page.set(newPage);
  }

  public savePreviewCinema(content: Array<previewCinema>): void {
    this.previewCinemaList.set(content);
    console.log(this.isPreviewCinemaList());
  }

  public addPreviewCinema(content: Array<previewCinema>): void {
    this.previewCinemaList.set([...this.previewCinemaList(), ...content]);
  }

  public saveSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  public readonly isPage: Signal<number> = this.page.asReadonly();
  public readonly isSearchQuery: Signal<string> = this.searchQuery.asReadonly();
  public readonly isPreviewCinemaList: Signal<Array<previewCinema>> = this.previewCinemaList.asReadonly();
}
