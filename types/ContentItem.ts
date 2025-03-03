import { Genre } from "./Genre";

export type ContentItem = {
  id: number;
  title: string;
  posterImage: string;
  backDropImage: string;
  releaseYear: string;
  voteRating: number;
  genre_ids?: number[];
  genres?: Genre[];
};
