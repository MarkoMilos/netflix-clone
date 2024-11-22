import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import prisma from "@/lib/prismadb";
import {without} from "lodash";

export async function POST(req: NextRequest) {
    // TODO find better way to handle unauthorized requests and resolving user
    const user = await getUserFromRequest(req);
    if (!user) {
        return new Response("Unauthorized", {status: 401});
    }

    // Get the movie id from the request body
    const {movieId} = await req.json();

    const existingMovie = await prisma.movie.findUnique(
        {where: {id: movieId}}
    )
    if (!existingMovie) {
        return new Response("Movie not found", {status: 404});
    }

    // Update the user with new favourite movie
    const updatedUser = await prisma.user.update({
        where: {email: user.email || ''},
        data: {
            favouriteIds: {
                push: movieId,
            },
        },
    });

    return NextResponse.json(updatedUser, {status: 200});
}

export async function DELETE(req: NextRequest) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return new Response("Unauthorized", {status: 401});
    }

    // Get the movie id from the request body
    const {movieId} = await req.json();

    const existingMovie = await prisma.movie.findUnique(
        {where: {id: movieId}}
    )
    if (!existingMovie) {
        return new Response("Movie not found", {status: 404});
    }

    const updatedFavouriteIds = without(user.favouriteIds, movieId);
    const updatedUser = await prisma.user.update({
        where: {email: user.email || ''},
        data: {
            favouriteIds: updatedFavouriteIds,
        },
    });

    return NextResponse.json(updatedUser, {status: 200});
}

// TODO move this to a shared utility file
async function getUserFromRequest(req: NextRequest) {
    const token = await getToken({req});
    if (!token || !token.email) {
        return null;
    }

    return prisma.user.findUnique({
        where: {
            email: token.email,
        },
    });
}
