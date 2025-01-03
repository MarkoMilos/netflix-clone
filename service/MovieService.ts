import movieRepository from "@/repository/MovieRepository";
import { Movie } from "@/types";

const movieService = {
  /**
   * Get a random movie from the repository.
   * Returns `null` if there are no movies available.
   */
  async getRandomMovie(): Promise<Movie | null> {
    // Get the total count of movies
    const movieCount = await movieRepository.count();
    if (movieCount === 0) {
      return null; // Return null if no movies exist
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * movieCount);

    // Fetch the movie at the random index
    return movieRepository.atIndex(randomIndex);
  },
};

export default movieService;
