import {NextResponse} from "next/server";
import {MovieService} from "@/service/MovieService";

export async function GET() {
    const movieService = new MovieService()
    const randomMovie = await movieService.getRandomMovie();
    return NextResponse.json(randomMovie, {status: 200});
}
