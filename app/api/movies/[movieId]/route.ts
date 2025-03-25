import { NextRequest, NextResponse } from "next/server";

import logger from "@/lib/logger";
import TMDBService from "@/service/TMDBService";

// eslint-disable-next-line import/prefer-default-export
export async function GET(_req: NextRequest, { params }: { params: { movieId: string } }) {
  const movieId = parseInt(params.movieId, 10);

  if (Number.isNaN(movieId)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  try {
    const [movie, cast, similarMovies] = await Promise.all([
      TMDBService.getMovieById(movieId),
      TMDBService.getMovieCast(movieId),
      TMDBService.getSimilarMovies(movieId),
    ]);

    movie.cast = cast;
    movie.similar = similarMovies.filter(similarMovie => similarMovie.backdrop_path !== null);

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    logger.error("Error fetching movie:", error);
    return NextResponse.json({ message: "Movie not found" }, { status: 404 });
  }
}
