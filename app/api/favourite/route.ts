import {NextRequest, NextResponse} from "next/server";
import {authUser} from "@/lib/auth/session";
import {UserService} from "@/service/UserService";

const userService = new UserService();

export async function POST(req: NextRequest) {
    const user = await authUser(req);
    const {movieId} = await req.json();

    try {
        const updatedUser = await userService.addFavouriteMovie(user?.id || '', movieId);
        return NextResponse.json(updatedUser, {status: 200});
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json({message: err.message}, {status: 404});
    }
}

export async function DELETE(req: NextRequest) {
    const user = await authUser(req);
    const {movieId} = await req.json();

    try {
        const updatedUser = await userService.removeFavouriteMovie(user?.id || '', movieId);
        return NextResponse.json(updatedUser, {status: 200});
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json({message: err.message}, {status: 404});
    }
}
