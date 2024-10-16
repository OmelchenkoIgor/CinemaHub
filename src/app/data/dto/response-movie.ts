import {previewMovieDTO} from './preview-movie';

export type responseMovieDTO = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<previewMovieDTO>;
}
