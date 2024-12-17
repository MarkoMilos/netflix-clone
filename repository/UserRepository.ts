import prisma from "@/lib/prismadb";
import {User} from "@/types";
import {User as PrismaUser} from "@prisma/client";

class UserRepository {

    async create(email: string, name: string, hashedPassword: string): Promise<User> {
        const prismaUser = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: "",
                emailVerified: new Date(),
            }
        });
        return this.mapToDomainUser(prismaUser);
    }

    async findById(id: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({where: {id}});
        return prismaUser ? this.mapToDomainUser(prismaUser) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({where: {email}});
        return prismaUser ? this.mapToDomainUser(prismaUser) : null;
    }

    async updateFavouriteIds(userId: string, favouriteIds: string[]): Promise<User | null> {
        const prismaUser = await prisma.user.update({
            where: {id: userId},
            data: {
                favouriteIds: favouriteIds,
            },
        });
        return prismaUser ? this.mapToDomainUser(prismaUser) : null;
    }

    private mapToDomainUser(prismaUser: PrismaUser): User {
        return {
            id: prismaUser.id,
            name: prismaUser.name,
            image: prismaUser.image,
            email: prismaUser.email,
            emailVerified: prismaUser.emailVerified,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
            favouriteIds: prismaUser.favouriteIds,
        }
    }
}

const userRepository = new UserRepository();
export {userRepository, UserRepository};