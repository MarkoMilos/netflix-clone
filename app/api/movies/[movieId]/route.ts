import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest, {params}: { params: { movieId: string } }) {
    const token = await getToken({req: request});
    if (!token || !token.email) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const movieId = params.movieId;
    if (!movieId) {
        return NextResponse.json({message: "Movie id is required"}, {status: 400});
    }

    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId,
        },
    });

    if (!movie) {
        return NextResponse.json({message: "Movie not found"}, {status: 404});
    }

    return NextResponse.json(movie, {status: 200});
}
