import {Component, computed, effect, HostListener, inject, input, InputSignal, OnDestroy, Signal} from '@angular/core';
import {LoadingSpinnerComponent, PreviewCardComponent} from '@shared/components';
import {GetCinemaCommand} from '@commands/get-cinema.command';
import {PreviewCinemaRepository} from '@data/repositories';
import {previewCinema} from '@data/entities';
import {Category} from '@shared/type';

@Component({
  standalone: true,
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrl: './preview-list.component.scss',
  imports: [PreviewCardComponent, LoadingSpinnerComponent]
})
export class PreviewListComponent implements OnDestroy {
  public readonly category: InputSignal<Category> = input.required();

  private readonly getCinema: GetCinemaCommand = inject(GetCinemaCommand);

  private readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  protected isLoading: boolean = true;
  protected readonly previewList: Signal<Array<previewCinema>> = computed(() => this.previewCinema.isPreviewCinemaList());

  constructor() {
    effect(() => {
      if (this.category() === 'all') {
        this.getCinema.execute('trending', 'all', 1, 'en');
      } else if (this.category() === 'movie') {
        this.getCinema.execute('discover', 'movie', 1, 'en');
      } else if (this.category() === 'tv') {
        this.getCinema.execute('discover', 'tv', 1, 'en');
      }
    });

    effect(() => {
      if (this.previewList() && this.previewList().length) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.previewCinema.setNewPage(2);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const threshold: number = document.body.offsetHeight * 0.9;

    if (scrollPosition >= threshold && !this.isLoading && !this.previewCinema.isSearchQuery().length) {
      this.isLoading = true;
      if (this.category() === 'all') {
        this.getCinema.execute('trending', 'all', this.previewCinema.isPage(), 'en');
        this.previewCinema.setNewPage(this.previewCinema.isPage() + 1);
      } else if (this.category() === 'movie') {
        this.getCinema.execute('discover', 'movie', this.previewCinema.isPage(), 'en');
        this.previewCinema.setNewPage(this.previewCinema.isPage() + 1);
      } else if (this.category() === 'tv') {
        this.getCinema.execute('discover', 'tv', this.previewCinema.isPage(), 'en');
        this.previewCinema.setNewPage(this.previewCinema.isPage() + 1);
      }
    }
  }
}
