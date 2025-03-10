import { Genre } from "./Genre";

/**
 * Represents a content item in the streaming platform, which can be either a movie or TV show.
 *
 * @property {number} id - Unique identifier for the content
 * @property {string} title - The title of the movie or TV show
 * @property {string} posterImage - URL or path to the poster image of the content
 * @property {string} backDropImage - URL or path to the backdrop/banner image of the content
 * @property {string} releaseYear - The year when the content was released
 * @property {number} voteRating - Average rating score from user votes (typically on a scale of 0-10)
 * @property {number[]} [genre_ids] - Optional array of genre identifiers associated with the content
 * @property {Genre[]} [genres] - Optional array of Genre objects containing detailed genre information
 */
export type Content = {
  id: number;
  title: string;
  posterImage: string;
  backDropImage: string;
  releaseYear: string;
  voteRating: number;
  genre_ids?: number[];
  genres?: Genre[];
};
