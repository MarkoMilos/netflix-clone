import {NextRequest, NextResponse} from "next/server";
import {authUser} from "@/lib/auth/session";
import {MovieRepository} from "@/repository/MovieRepository";

export async function GET(req: NextRequest) {
    const user = await authUser(req);
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    const movieRepository = new MovieRepository();
    const favouriteMovies = await movieRepository.getByIds(user.favouriteIds);
    return NextResponse.json(favouriteMovies, {status: 200});
}
