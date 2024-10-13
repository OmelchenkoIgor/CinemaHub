import {Component, computed, effect, HostListener, inject, input, InputSignal, OnDestroy, Signal} from '@angular/core';
import {PreviewCardComponent} from '@features/preview-card';
import {PreviewCinemaRepository} from '@data/repositories';
import {LoadingSpinnerComponent} from '@shared/components';
import {previewCinema} from '@data/entities';
import {Category, Type} from '@shared/type';
import {GetCinemaCommand} from '@commands';
import {TitlePipe} from '@shared/pipe';

@Component({
  standalone: true,
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrl: './preview-list.component.scss',
  imports: [PreviewCardComponent, LoadingSpinnerComponent, TitlePipe]
})
export class PreviewListComponent implements OnDestroy {
  public readonly category: InputSignal<Category> = input.required();
  private readonly getCinema: GetCinemaCommand = inject(GetCinemaCommand);
  public readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  private readonly categoryActions: { [key: string]: { action: Type; type: Category } } = {
    'all': {action: 'trending', type: 'all'},
    'movie': {action: 'discover', type: 'movie'},
    'tv': {action: 'discover', type: 'tv'}
  };

  protected isLoading: boolean = true;
  protected readonly previewList: Signal<Array<previewCinema>> = computed(() => this.previewCinema.isPreviewCinemaList());

  constructor() {
    effect(() => {
      this.fetchData(1);
    });

    effect(() => {
      if (this.previewList() && this.previewList().length) {
        this.isLoading = false;
        setTimeout(() => this.checkContentHeight());
      }
    });
  }

  private fetchData(page: number): void {
    const categoryInfo: { action: Type; type: Category } = this.categoryActions[this.category()];

    if (categoryInfo) {
      this.getCinema.execute(categoryInfo.action, categoryInfo.type, page, 'en');
    }
  }

  private loadMoreData(): void {
    this.isLoading = true;
    const page: number = this.previewCinema.isPage();

    this.fetchData(page);
    this.previewCinema.setNewPage(page + 1);
  }

  private checkContentHeight(): void {
    const contentHeight: number = document.body.scrollHeight;
    const viewportHeight: number = window.innerHeight;

    if (contentHeight <= viewportHeight && !this.isLoading && !this.previewCinema.isSearchQuery().length) {
      this.loadMoreData();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const threshold: number = document.body.offsetHeight * 0.9;

    if (scrollPosition >= threshold && !this.isLoading && !this.previewCinema.isSearchQuery().length) {
      this.loadMoreData();
    }
  }

  ngOnDestroy(): void {
    this.previewCinema.setNewPage(2);
    this.previewCinema.setSearchQuery('');
  }
}
