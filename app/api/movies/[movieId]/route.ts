import {NextRequest, NextResponse} from "next/server";
import {MovieRepository} from "@/repository/MovieRepository";

export async function GET(_req: NextRequest, {params}: { params: { movieId: string } }) {
    const movieId = params.movieId;
    if (!movieId) {
        return NextResponse.json({message: "Movie id is required"}, {status: 400});
    }

    const movieRepository = new MovieRepository();
    const movie = await movieRepository.getById(movieId);

    if (movie) {
        return NextResponse.json(movie, {status: 200});
    } else {
        return NextResponse.json({message: "Movie not found"}, {status: 404});
    }
}
