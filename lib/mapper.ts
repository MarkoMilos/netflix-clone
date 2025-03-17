import { Content as PrismaContent } from "@prisma/client";

import { Movie, Content, Genre } from "@/types";

/**
 * Assigns genres to a movie based on its genre_ids
 * @param movie - Movie to assign genres to
 * @param availableGenres - Available genres to assign from
 * @returns Movie with genres assigned
 */
export const assignGenres = (movie: Movie, availableGenres: Genre[] = []): Movie => {
  // If movie already has genres, return as is
  if (movie.genres && movie.genres.length > 0) {
    return movie;
  }

  // Otherwise assign genres from genre_ids
  let genres: Genre[] = [];
  if (movie.genre_ids && movie.genre_ids.length > 0 && availableGenres.length > 0) {
    genres = availableGenres.filter(genre => movie.genre_ids.includes(genre.id));
  }

  // Return a new movie object with the assigned genres
  return { ...movie, genres };
};

/**
 * Maps a Movie object to a Content object
 * @param movie - The Movie object to map
 * @returns A Content object
 */
export const mapMovieToContent = (movie: Movie): Content => {
  // Parse year from release_date or use empty string if release_date is undefined
  const year = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "n/a";
  // Map similar movies to content
  const similarContent = movie.similar?.map(similarMovie => mapMovieToContent(similarMovie));

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterImage: movie.poster_path,
    backDropImage: movie.backdrop_path,
    releaseYear: year,
    voteRating: movie.vote_average,
    genre_ids: movie.genre_ids,
    genres: movie.genres,
    videos: movie.videos,
    images: movie.images,
    cast: movie.cast,
    similar: similarContent,
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
    overview: content.overview,
    posterImage: content.posterImage || "",
    backDropImage: content.backDropImage || "",
    releaseYear: content.releaseYear || "",
    voteRating: content.voteRating || 0,
    genre_ids: (content.genre_ids as number[]) || [],
    genres,
  };
};
