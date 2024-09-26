export type previewCinemaDTO = {
  id: number;
  name?: string;
  title?: string;
  adult: boolean;
  overview: string;
  popularity: number;
  media_type: string;
  vote_count: number;
  poster_path: string;
  vote_average: number;
  original_name: string;
  backdrop_path: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids: Array<number>;
  original_language: string;
  origin_country: Array<string>;
}
