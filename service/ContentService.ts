import { mapMovieToContent, assignGenres } from "@/lib/mapper";
import TMDBService from "@/service/TMDBService";
import { Movie, ContentSection } from "@/types";

const contentService = {
  /**
   * Get a random trending movie from TMDB along with its videos.
   * Throws an error if the API call fails.
   */
  async getRandomTrendingMovie(): Promise<Movie | null> {
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
    // Fetch all data in parallel
    const [genres, popular, trending, byGenre] = await Promise.all([
      TMDBService.getGenres(),
      TMDBService.getPopularMovies(),
      TMDBService.getTrendingMovies(),
      TMDBService.getMoviesByGenres(),
    ]);

    // First assign genres to movies, then map to content items
    const popularContentItems = popular.map(movie =>
      mapMovieToContent(assignGenres(movie, genres)),
    );

    const trendingContentItems = trending
      .map(movie => mapMovieToContent(assignGenres(movie, genres)))
      .slice(0, 10);

    const genreContentItemMap = byGenre.map(({ genre, movies }) => ({
      genre,
      content: movies.map(movie => mapMovieToContent(assignGenres(movie, genres))),
    }));

    // Create content sections
    const popularContent: ContentSection = {
      label: "Popular on Netflix",
      content: popularContentItems,
      type: "standard",
    };

    const trendingContent: ContentSection = {
      label: "Trending Now",
      content: trendingContentItems,
      type: "ranked",
    };

    const genreContent: ContentSection[] = genreContentItemMap.map(({ genre, content }) => ({
      label: genre.name,
      content,
      type: "standard",
    }));

    // Combine all content sections
    return [popularContent, trendingContent, ...genreContent];
  },
};

export default contentService;
