import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    // Retrieve and verify the token from the HTTP-only cookie
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    // If no valid token is found, deny access
    if (!token) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, {status: 200});
}
