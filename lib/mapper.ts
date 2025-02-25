import { getBackdropUrl } from "@/lib/tmdb-image";
import { ContentItem, Movie } from "@/types";

const mapMovieToContentItem = (movie: Movie): ContentItem => ({
  ...movie,
  contentId: movie.id,
  contentTitle: movie.title,
  contentPosterImage: getBackdropUrl(movie.backdrop_path, "w780") ?? "",
  contentYear: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
  contentRating: movie.vote_average,
});

export default mapMovieToContentItem;
