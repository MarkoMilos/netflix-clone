import { compare } from "bcrypt";

import prisma from "@/lib/prismadb";

/**
 * Authorizes a user based on their email and password
 * @param username The user's email address
 * @param password The user's password
 * @returns The user object if authentication is successful
 * @throws Error if credentials are missing, user doesn't exist, or password is invalid
 */
export default async function authorize(username?: string, password?: string) {
  // Validate that both username and password are provided
  if (!username || !password) {
    throw new Error("Missing credentials");
  }

  // Look up user in database by email
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  // Verify user exists and has a password
  if (!user || !user.password) {
    throw new Error("User does not exist.");
  }

  // Compare provided password with stored hash
  const isCorrectPassword = await compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  return user;
}
