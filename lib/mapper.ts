import { Content as PrismaContent } from "@prisma/client";

import { getBackdropUrl, getPosterUrl } from "./tmdb-image";
import { Movie, Content, Genre } from "@/types";

/**
 * Maps a Movie object to a Content object
 * @param movie - The Movie object to map
 * @param genres - An array of Genre objects to use for mapping
 * @returns A Content object
 */
export const mapMovieToContent = (movie: Movie, genres: Genre[] = []): Content => {
  // Parse year from release_date or use empty string if release_date is undefined
  const year = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "n/a";

  // Map genres if genre_ids and genres are available
  const mappedGenres =
    movie.genre_ids && genres.length > 0
      ? genres.filter(genre => movie.genre_ids.includes(genre.id))
      : [];

  return {
    id: movie.id,
    title: movie.title,
    posterImage: getPosterUrl(movie.poster_path, "w342") ?? "",
    backDropImage: getBackdropUrl(movie.backdrop_path, "w780") ?? "",
    releaseYear: year,
    voteRating: movie.vote_average,
    genre_ids: movie.genre_ids,
    genres: mappedGenres,
  };
};

/**
 * Maps a Prisma Content model to a Content domain model
 * @param content - The Prisma Content model from database
 * @returns A Content domain model
 */
export const mapPrismaContentToContent = (content: PrismaContent): Content => {
  // Parse the genres from JSON to Genre objects
  let genres: Genre[] = [];
  if (Array.isArray(content.genres)) {
    genres = content.genres as Genre[];
  } else if (typeof content.genres === "object" && content.genres !== null) {
    genres = [content.genres as Genre];
  }

  return {
    id: content.id,
    title: content.title,
    posterImage: content.posterImage || "",
    backDropImage: content.backDropImage || "",
    releaseYear: content.releaseYear || "",
    voteRating: content.voteRating || 0,
    genre_ids: (content.genre_ids as number[]) || [],
    genres,
  };
};
