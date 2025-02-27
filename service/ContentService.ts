import logger from "@/lib/logger";
import mapMovieToContentItem from "@/lib/mapper";
import TMDBService from "@/service/TMDBService";
import { Movie, ContentSection } from "@/types";

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

  /**
   * Get a random trending movie from TMDB API for the home page billboard.
   * @returns A random trending movie from TMDB API
   */
  async getHomePageBillboard(): Promise<Movie | null> {
    return this.getRandomTrendingMovie();
  },

  /**
   * Get all content required for the homepage display
   * @returns An array of HomepageContent objects containing different sections to display
   */
  async getHomepageContent(): Promise<ContentSection[]> {
    try {
      // Fetch all data in parallel
      const [genres, popular, trending, byGenre] = await Promise.all([
        TMDBService.getGenres(),
        TMDBService.getPopularMovies(),
        TMDBService.getTrendingMovies(),
        TMDBService.getMoviesByGenres(),
      ]);

      // Map movies to content items and hydrate with genre information
      const popularContentItems = popular.map(movie => mapMovieToContentItem(movie, genres));
      const trendingContentItems = trending.map(movie => mapMovieToContentItem(movie, genres));
      const genreContentItemMap = byGenre.map(({ genre, movies }) => ({
        genre,
        contentItems: movies.map(movie => mapMovieToContentItem(movie, genres)),
      }));

      // Create content sections
      const popularContent: ContentSection = {
        label: "Popular on Netflix",
        content: popularContentItems,
      };

      const trendingContent: ContentSection = {
        label: "Trending Now",
        content: trendingContentItems,
      };

      const genreContent: ContentSection[] = genreContentItemMap.map(({ genre, contentItems }) => ({
        label: genre.name,
        content: contentItems,
      }));

      // Combine all content sections
      return [popularContent, trendingContent, ...genreContent];
    } catch (error) {
      logger.error("Failed to fetch homepage content:", error);
      return [];
    }
  },
};

export default contentService;
