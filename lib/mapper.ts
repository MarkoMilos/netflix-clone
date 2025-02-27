import { getBackdropUrl } from "./tmdb-image";
import { Movie, ContentItem, Genre } from "@/types";

/**
 * Maps a Movie object to a ContentItem object
 * @param movie - The Movie object to map
 * @param genres - An array of Genre objects to use for mapping
 * @returns A ContentItem object
 */
const mapMovieToContentItem = (movie: Movie, genres: Genre[] = []): ContentItem => {
  // Parse year from release_date or use empty string if release_date is undefined
  const year = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "n/a";

  // Map genres if genre_ids and genres are available
  const mappedGenres =
    movie.genre_ids && genres.length > 0
      ? genres.filter(genre => movie.genre_ids.includes(genre.id))
      : [];

  return {
    contentId: movie.id,
    contentTitle: movie.title,
    contentPosterImage: getBackdropUrl(movie.backdrop_path, "w780") ?? "",
    contentYear: year,
    contentRating: movie.vote_average,
    genres: mappedGenres,
  };
};

export default mapMovieToContentItem;
