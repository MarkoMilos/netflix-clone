import logger from "@/lib/logger";
import TMDBService from "@/service/TMDBService";
import { Movie } from "@/types";

const contentService = {
  /**
   * Get a random trending movie from TMDB along with its videos.
   * Returns `null` if there are no trending movies available.
   */
  async getRandomTrendingMovie(): Promise<Movie | null> {
    try {
      // Fetch trending movies
      const trendingMovies = await TMDBService.getTrendingMovies("week");
      if (trendingMovies.length === 0) {
        return null;
      }

      // Select a random movie
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      const randomMovie = trendingMovies[randomIndex];

      // Fetch videos for the selected movie
      const videos = await TMDBService.getMovieVideos(randomMovie.id);

      // Extend the existing Movie object with videos
      return { ...randomMovie, videos };
    } catch (error) {
      logger.error("Failed to fetch random trending movie with videos:", error);
      return null;
    }
  },
};

export default contentService;
