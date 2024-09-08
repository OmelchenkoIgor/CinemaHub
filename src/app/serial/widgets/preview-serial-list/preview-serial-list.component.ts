import {Component, computed, effect, HostListener, inject, OnDestroy, Signal} from '@angular/core';
import {LoadingSpinnerComponent, PreviewCardComponent} from '@shared/components';
import {GetNextSeriesPageCommand} from '@serial/commands';
import {PageSerialRepository, previewSerial, PreviewSerialRepository, SearchSerialRepository} from '@serial/data';

@Component({
  standalone: true,
  selector: 'app-preview-serial-list',
  templateUrl: './preview-serial-list.component.html',
  styleUrl: './preview-serial-list.component.scss',
  imports: [LoadingSpinnerComponent, PreviewCardComponent]
})
export class PreviewSerialListComponent implements OnDestroy {
  private readonly getNextSerialPageCommand: GetNextSeriesPageCommand = inject(GetNextSeriesPageCommand);

  private readonly pageSerialRepository: PageSerialRepository = inject(PageSerialRepository);
  private readonly searchSerialRepository: SearchSerialRepository = inject(SearchSerialRepository);
  protected readonly previewSerialRepository: PreviewSerialRepository = inject(PreviewSerialRepository);
  protected readonly previewSerialList: Signal<Array<previewSerial>> = computed(() => this.previewSerialRepository.getPreviewSeries());

  protected isLoading: boolean = true;

  constructor() {
    effect(() => {
      if (this.previewSerialList() && this.previewSerialList().length) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.pageSerialRepository.saveNewPage(2);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const threshold: number = document.body.offsetHeight * 0.9;

    if (scrollPosition >= threshold && !this.isLoading && !this.searchSerialRepository.getSearchSerial()) {
      this.isLoading = true;
      this.getNextSerialPageCommand.execute();
    }
  }
}
