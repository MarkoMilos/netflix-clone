import axios from "axios";

import logger from "@/lib/logger";
import { Movie, Video, Genre, CastMember } from "@/types";

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
      logger.error("Failed to fetch trending movies:", error);
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
      logger.error("Failed to fetch popular movies:", error);
      throw error;
    }
  },

  /**
   * Fetch detailed information about a specific movie by its ID
   * @param movieId - The TMDB ID of the movie
   * @returns Detailed movie object including videos and images
   */
  async getMovieById(movieId: number): Promise<Movie> {
    try {
      const response = await client.get(`/movie/${movieId}`, {
        params: {
          language: "en-US",
          append_to_response: "videos,images",
          include_image_language: "en,null",
        },
      });

      // Extract nested videos into the format expected by the Movie type
      const movieData = response.data;
      // Extract videos from the nested structure to match our Movie type
      if (movieData.videos && Array.isArray(movieData.videos.results)) {
        movieData.videos = movieData.videos.results;
      }
      return movieData;
    } catch (error) {
      logger.error(`Failed to fetch details for movie ${movieId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch movie cast from TMDB API
   * @param movieId - The TMDB movie ID
   * @returns Array of cast members
   */
  async getMovieCast(movieId: number): Promise<CastMember[]> {
    try {
      const response = await client.get(`/movie/${movieId}/credits`, {
        params: { language: "en-US" },
      });

      return response.data.cast; // Return cast array
    } catch (error) {
      logger.error(`Failed to fetch movie cast for ${movieId}:`, error);
      return [];
    }
  },

  /**
   * Fetch similar movies from TMDB API
   * @param movieId - The TMDB movie ID
   * @returns Array of similar movies
   */
  async getSimilarMovies(movieId: number): Promise<Movie[]> {
    try {
      const response = await client.get(`/movie/${movieId}/similar`, {
        params: { language: "en-US", page: 1 },
      });

      return response.data.results; // Return similar movies array
    } catch (error) {
      logger.error(`Failed to fetch similar movies for ${movieId}:`, error);
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
      logger.error(`Failed to fetch videos for movie ${movieId}:`, error);
      throw error;
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
      logger.error("Failed to fetch movie genres:", error);
      throw error;
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
      logger.error(`Failed to fetch movies for genre ${genreId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch all genres and their corresponding movies
   * @param genres - Optional array of genres to use instead of fetching them
   * @returns Array of objects containing genre and its movies
   */
  async getMoviesByGenres(genres?: Genre[]) {
    try {
      const genresList = genres || (await this.getGenres());

      const genreMoviesPromises = genresList.map(genre =>
        this.getMoviesByGenre(genre.id).then(movies => ({
          genre,
          movies,
        })),
      );

      return Promise.all(genreMoviesPromises);
    } catch (error) {
      logger.error("Failed to fetch movies for genres:", error);
      throw error;
    }
  },
};

export default TMDBService;
