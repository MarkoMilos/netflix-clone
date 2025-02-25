import axios from "axios";

// TODO do we need try catch like this here or should we propagate error
import logger from "@/lib/logger";
import { Movie, Video, Genre } from "@/types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const { TMDB_ACCESS_TOKEN } = process.env;

const client = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

const TMDBService = {
  /**
   * Fetch trending movies from TMDB API
   * @param timeWindow - "day" or "week"
   * @returns Array of trending movies
   */
  async getTrendingMovies(timeWindow: "day" | "week" = "week"): Promise<Movie[]> {
    try {
      const response = await client.get(`/trending/movie/${timeWindow}`, {
        params: { language: "en-US" },
      });

      return response.data.results;
    } catch (error) {
      logger.warn("Failed to fetch trending movies:", error);
      throw error;
    }
  },
  /**
   * Fetch popular movies from TMDB API
   * @param page - Page number for pagination (default: 1)
   * @returns Array of popular movies
   */
  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await client.get("/movie/popular", {
        params: {
          language: "en-US",
          page,
        },
      });
      return response.data.results;
    } catch (error) {
      logger.warn("Failed to fetch popular movies:", error);
      return [];
    }
  },
  /**
   * Fetches all available videos for a movie (trailers, teasers, clips, etc.)
   * @param movieId - The movie ID from TMDB API.
   * @returns An array of videos or an empty array if none exist.
   */
  async getMovieVideos(movieId: number): Promise<Video[]> {
    try {
      const response = await client.get(`/movie/${movieId}/videos`);
      return response.data.results as Video[];
    } catch (error) {
      logger.warn(`Failed to fetch videos for movie ${movieId}:`, error);
      return [];
    }
  },

  /**
   * Fetch all available movie genres from TMDB
   * @returns Array of genres with id and name
   */
  async getGenres(): Promise<Genre[]> {
    try {
      const response = await client.get("/genre/movie/list", {
        params: { language: "en-US" },
      });
      return response.data.genres;
    } catch (error) {
      logger.warn("Failed to fetch movie genres:", error);
      return [];
    }
  },

  /**
   * Fetch movies by genre
   * @param genreId - The ID of the genre to fetch movies for
   * @param page - Page number for pagination (default: 1)
   * @returns Array of movies
   */
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
    try {
      const response = await client.get("/discover/movie", {
        params: {
          with_genres: genreId,
          language: "en-US",
          page,
          sort_by: "popularity.desc",
        },
      });
      return response.data.results;
    } catch (error) {
      logger.warn(`Failed to fetch movies for genre ${genreId}:`, error);
      return [];
    }
  },

  /**
   * Fetch all genres and their corresponding movies
   * @returns Array of objects containing genre and its movies
   */
  async getMoviesForAllGenres() {
    try {
      const genres = await this.getGenres();

      const genreMoviesPromises = genres.map(genre =>
        this.getMoviesByGenre(genre.id).then(movies => ({
          genre,
          movies,
        })),
      );

      return Promise.all(genreMoviesPromises);
    } catch (error) {
      logger.warn("Failed to fetch movies for genres:", error);
      return [];
    }
  },
};

export default TMDBService;
