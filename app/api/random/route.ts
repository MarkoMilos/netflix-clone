import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prismadb";
import {getToken} from "next-auth/jwt";

export async function GET(req: NextRequest) {
    // Retrieve and verify the token from the HTTP-only cookie
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    // If no valid token is found, deny access
    if (!token || !token.email) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    // Get the movie count from the database
    const movieCount = await prisma.movie.count();
    if (movieCount === 0) {
        return NextResponse.json({message: "No movies found"}, {status: 404});
    }

    // Get random movie from the database
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovie = await prisma.movie.findFirst({
        take: 1,
        skip: randomIndex
    });

    return NextResponse.json(randomMovie, {status: 200});
}
