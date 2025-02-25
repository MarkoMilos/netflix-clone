import { ContentItem } from "@/components/ContentCarousel/ContentCarousel";
import { getBackdropUrl } from "@/lib/tmdb-image";
import { Movie } from "@/types";

const mapMovieToContentItem = (movie: Movie): ContentItem => ({
  ...movie,
  contentId: movie.id,
  contentTitle: movie.title,
  contentPosterImage: getBackdropUrl(movie.backdrop_path, "w300") ?? "",
});

export default mapMovieToContentItem;
