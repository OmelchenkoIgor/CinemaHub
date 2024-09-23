import {previewSerialDTO} from '@content/serial';

export type responseSerialDTO = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<previewSerialDTO>;
}
