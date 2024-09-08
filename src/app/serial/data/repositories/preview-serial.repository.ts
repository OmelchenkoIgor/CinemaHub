import {Injectable, signal, WritableSignal} from '@angular/core';
import {previewSerial} from '@serial/data';

@Injectable({providedIn: 'root'})
export class PreviewSerialRepository {
  private previewSerialList: WritableSignal<Array<previewSerial>> = signal([]);

  public getPreviewSeries(): Array<previewSerial> {
    return this.previewSerialList();
  }

  public savePreviewSeries(series: Array<previewSerial>): void {
    this.previewSerialList.set(series);
  }

  public addPreviewSeries(series: Array<previewSerial>): void {
    this.previewSerialList.set([...this.previewSerialList(), ...series])
  }
}
