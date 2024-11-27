import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse,} from "next"
import {getServerSession} from "next-auth"
import authConfig from "@/lib/auth/config";
import {NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";
import {UserRepository} from "@/repository/UserRepository";

/**
 * Retrieves the server session based on the provided arguments.
 *
 * This function can handle different types of arguments:
 * - `GetServerSidePropsContext["req"]` and `GetServerSidePropsContext["res"]`
 * - `NextApiRequest` and `NextApiResponse`
 * - An empty array
 *
 * @param args - The arguments to retrieve the server session. It can be:
 *   - `[GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]`
 *   - `[NextApiRequest, NextApiResponse]`
 *   - `[]`
 * @returns The server session object.
 */
export default function authSession(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authConfig)
}

/**
 * Retrieves the user from the request.
 *
 * This function extracts the JWT token from the request using `getToken` and
 * then fetches the user from the database based on the email present in the token.
 *
 * @param req - The request object.
 * @returns The user object if found, otherwise null.
 */
export async function authUser(req: NextRequest) {
    const token = await getToken({req});

    if (!token || !token.email) {
        return null;
    }

    const userRepository = new UserRepository()
    return userRepository.findByEmail(token.email)
}
