import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import authConfig from "@/lib/auth/config";
import userService from "@/service/UserService";
import { User } from "@/types";

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
  return getServerSession(...args, authConfig);
}

/**
 * Retrieves the authenticated user from either a request or the current session.
 *
 * This function supports two use cases:
 * 1. When a `NextRequest` is provided, it extracts the JWT token from the request
 *    and fetches the user from the database based on the email in the token.
 * 2. When no `NextRequest` is provided, it retrieves the current session,
 *    extracts the user's email, and fetches the corresponding user from the database.
 *
 * @function
 * @overload
 * @async
 * @param {NextRequest} [req] - The HTTP request object containing cookies and headers (optional).
 * @returns {Promise<User | null>} A promise that resolves to the user object if authenticated, or `null` if:
 * - The user is not authenticated.
 * - The user does not exist in the database.
 *
 * @example
 * // Using authUser with a NextRequest
 * const user = await authUser(req);
 * if (user) {
 *   console.log(`Authenticated user: ${user.name}`);
 * }
 *
 * @example
 * // Using authUser without a request (server-side session)
 * const user = await authUser();
 * if (user) {
 *   console.log(`Authenticated user: ${user.name}`);
 * }
 */
export async function authUser(req: NextRequest): Promise<User | null>;
export async function authUser(): Promise<User | null>;

export async function authUser(req?: NextRequest) {
  if (req) {
    const token = await getToken({ req });

    if (!token || !token.email) {
      return null;
    }

    return userService.findByEmail(token.email);
  } else {
    const session = await authSession();
    const email = session?.user?.email;
    if (!email) return null;

    return userService.findByEmail(email);
  }
}
