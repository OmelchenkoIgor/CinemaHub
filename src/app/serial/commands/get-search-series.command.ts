import {ApiService, previewSerial, previewSerialDTO, PreviewSerialMappers, PreviewSerialRepository, responseSerialDTO, SearchSerialRepository} from '@serial/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetSearchSeriesCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly searchSerialRepository: SearchSerialRepository = inject(SearchSerialRepository);
  private readonly previewSerialRepository: PreviewSerialRepository = inject(PreviewSerialRepository);

  public execute(query: string): void {
    this.searchSerialRepository.saveSearchSerial(query);
    this.api.getSearch('tv', query, 1, 'en').subscribe({
      next: (response: responseSerialDTO) => {
        const previewMovieList: Array<previewSerial> = response.results.map((previewSerial: previewSerialDTO) => PreviewSerialMappers.doDomain(previewSerial));
        this.previewSerialRepository.savePreviewSeries(previewMovieList);
      },
      error: () => {
        console.error('Unsuccessful request for a serial list');
      }
    })
  }
}
