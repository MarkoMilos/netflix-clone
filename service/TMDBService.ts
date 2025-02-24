import axios from "axios";

import logger from "@/lib/logger";
import { Movie, Video } from "@/types";

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
};

export default TMDBService;
