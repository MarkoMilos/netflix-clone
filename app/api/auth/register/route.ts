import {NextResponse} from "next/server";
import {UserService} from "@/service/UserService";

const userService = new UserService();

// TODO this API route should be protected with CAPTCHA in order to prevent bots from creating accounts

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, name, password} = body;

        try {
            const user = await userService.createUser(email, name, password);
            return NextResponse.json(user);
        } catch (error: unknown) {
            const err = error as Error;
            return NextResponse.json({message: err.message}, {status: 422});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}
