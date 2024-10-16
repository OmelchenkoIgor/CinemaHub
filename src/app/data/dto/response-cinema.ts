import {previewCinemaDTO} from './preview-cinema';

export type responseCinemaDTO = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<previewCinemaDTO>;
}
