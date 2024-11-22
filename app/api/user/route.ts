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

    // Optional: add role or permission checks here based on the token

    // Fetch the user from the database based on the verified email from the token
    const user = await prisma.user.findUnique({
        where: {
            email: token.email,
        },
    });

    // If the user is found, return user data, else send 404
    if (user) {
        return NextResponse.json(user, {status: 200});
    } else {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
}
