import { User as PrismaUser } from "@prisma/client";

import prisma from "@/lib/prismadb";
import { User } from "@/types";

function mapToDomainUser(prismaUser: PrismaUser): User {
  return {
    id: prismaUser.id,
    name: prismaUser.name,
    image: prismaUser.image,
    email: prismaUser.email,
    emailVerified: prismaUser.emailVerified,
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt,
    favouriteIds: prismaUser.favouriteIds,
  };
}

const userRepository = {
  async create(email: string, name: string, hashedPassword: string): Promise<User> {
    const prismaUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return mapToDomainUser(prismaUser);
  },

  async findById(id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { id } });
    return prismaUser ? mapToDomainUser(prismaUser) : null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { email } });
    return prismaUser ? mapToDomainUser(prismaUser) : null;
  },

  async updateFavouriteIds(userId: string, favouriteIds: string[]): Promise<User | null> {
    const prismaUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favouriteIds,
      },
    });
    return prismaUser ? mapToDomainUser(prismaUser) : null;
  },
};

export default userRepository;
