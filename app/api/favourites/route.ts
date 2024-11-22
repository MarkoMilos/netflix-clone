import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    const token = await getToken({req});
    if (!token || !token.email) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: token.email,
        },
    });
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    const favouriteMovies = await prisma.movie.findMany({
        where: {
            id: {
                in: user.favouriteIds,
            },
        },
    });

    return NextResponse.json(favouriteMovies, {status: 200});
}
