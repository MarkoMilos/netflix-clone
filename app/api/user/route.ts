import {NextRequest, NextResponse} from "next/server";
import {authUser} from "@/lib/auth/session";

export async function GET(req: NextRequest) {
    const user = await authUser(req);

    if (user) {
        return NextResponse.json(user, {status: 200});
    } else {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
}
