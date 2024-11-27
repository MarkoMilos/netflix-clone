import {NextResponse} from "next/server";
import {MovieRepository} from "@/repository/MovieRepository";

export async function GET() {
    const movieRepository = new MovieRepository()
    const movies = await movieRepository.getAll();
    return NextResponse.json(movies, {status: 200});
}
