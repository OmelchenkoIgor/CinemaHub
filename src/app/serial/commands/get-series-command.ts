import {ApiService, previewSerial, previewSerialDTO, PreviewSerialMappers, PreviewSerialRepository, responseSerialDTO} from '@serial/data';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GetSeriesCommand {
  private readonly api: ApiService = inject(ApiService);
  private readonly previewSerialRepository: PreviewSerialRepository = inject(PreviewSerialRepository);

  public execute(): void {
    this.api.getSerial(1, 'tv', 'en').subscribe({
      next: (response: responseSerialDTO) => {
        const previewSerialList: Array<previewSerial> = response.results.map((previewSerial: previewSerialDTO) => PreviewSerialMappers.doDomain(previewSerial));
        this.previewSerialRepository.savePreviewSeries(previewSerialList);
      },
      error: () => {
        console.error('Unsuccessful request for a serial list');
      }
    })
  }
}
