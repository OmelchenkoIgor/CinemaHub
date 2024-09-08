import {ApiService, PageSerialRepository, previewSerial, previewSerialDTO, PreviewSerialMappers, PreviewSerialRepository, responseSerialDTO} from '@serial/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetNextSeriesPageCommand {
  private readonly api: ApiService = inject(ApiService);

  private readonly pageSerialRepository: PageSerialRepository = inject(PageSerialRepository);
  private readonly previewSerialRepository: PreviewSerialRepository = inject(PreviewSerialRepository);

  public execute(): void {
    this.api.getSerial(this.pageSerialRepository.getPage(), 'tv', 'en').subscribe({
      next: (response: responseSerialDTO) => {
        const previewMovieList: Array<previewSerial> = response.results.map((previewMovie: previewSerialDTO) => PreviewSerialMappers.doDomain(previewMovie));
        this.previewSerialRepository.addPreviewSeries(previewMovieList);
        this.pageSerialRepository.saveNewPage(this.pageSerialRepository.getPage() + 1);
      },
      error: () => {
        console.error('Unsuccessful request for a serial list');
      }
    })
  }
}
