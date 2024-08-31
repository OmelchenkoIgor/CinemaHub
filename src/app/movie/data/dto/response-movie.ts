import {previewMovieDTO} from '@movie/data';

export type responseMovieDTO = {
  page: number,
  total_pages: number,
  total_results: number
  results: Array<previewMovieDTO>,
}
