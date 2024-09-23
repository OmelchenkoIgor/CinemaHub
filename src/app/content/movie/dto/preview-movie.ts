export type previewMovieDTO = {
  id: number;
  title: string;
  adult: boolean;
  video: boolean;
  overview: string;
  popularity: number;
  vote_count: number;
  poster_path: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
  original_title: string;
  genre_ids: Array<number>;
  original_language: string;
}
