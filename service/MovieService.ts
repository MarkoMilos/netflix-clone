import {MovieRepository} from "@/repository/MovieRepository";
import {Movie} from "@/types";

class MovieService {

    private readonly movieRepository = new MovieRepository();

    async getRandomMovie(): Promise<Movie | null> {
        const movieCount = await this.movieRepository.count();
        if (movieCount === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * movieCount);
        return this.movieRepository.atIndex(randomIndex);
    }
}

const movieService = new MovieService();

export {movieService, MovieService};