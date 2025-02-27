import { Genre } from "./Genre";

export type ContentItem = {
  contentId: number;
  contentTitle: string;
  contentPosterImage: string;
  contentYear: string;
  contentRating: number;
  genre_ids?: number[];
  genres?: Genre[];
};
