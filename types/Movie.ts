import { CastMember } from "./CastMember";
import { Genre } from "./Genre";
import { ImageCollection } from "./Image";
import { Video } from "./Video";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres?: Genre[];
  images?: ImageCollection;
  videos?: Video[];
  cast?: CastMember[];
  similar?: Movie[];
};
