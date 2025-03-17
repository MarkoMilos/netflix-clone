import { User as PrismaUser } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { User } from "@/types";

function mapToDomainUser(prismaUser: PrismaUser): User {
  return {
    id: prismaUser.id,
    name: prismaUser.name || "",
    image: prismaUser.image,
    email: prismaUser.email,
    emailVerified: prismaUser.emailVerified,
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt,
  };
}

const userService = {
  /**
   * Creates a new user with the provided email, name, and password
   * @param email - User's email address
   * @param name - User's full name
   * @param password - User's plain text password
   * @returns Promise resolving to the created User object
   * @throws Error if user with email already exists
   */
  async createUser(email: string, name: string, password: string): Promise<User> {
    // Check if user already exists
    await prisma.user.findUnique({ where: { email } }).then(user => {
      if (user) throw new Error("User already exists");
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user and return the domain object
    return prisma.user
      .create({
        data: {
          email,
          name,
          password: hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      })
      .then(mapToDomainUser);
  },

  /**
   * Retrieves a user from the database by their email address
   * @param email - The email address to search for
   * @returns Promise that resolves to a User domain object if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { email } });
    return prismaUser ? mapToDomainUser(prismaUser) : null;
  },
};

export default userService;
