import {Movie} from "@/types";
import prisma from "@/lib/prismadb";
import {Movie as PrismaMovie} from "@prisma/client";

export class MovieRepository {

    async getAll(): Promise<Movie[]> {
        const prismaMovies = await prisma.movie.findMany();
        return prismaMovies.map(this.mapToDomainMovie);
    }

    async getById(id: string): Promise<Movie | null> {
        const movie = await prisma.movie.findUnique({
            where: {
                id: id
            }
        });
        return movie ? this.mapToDomainMovie(movie) : null;
    }

    async getByIds(ids: string[]): Promise<Movie[]> {
        const prismaMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        return prismaMovies.map(this.mapToDomainMovie);
    }

    async count(): Promise<number> {
        return prisma.movie.count();
    }

    async atIndex(index: number): Promise<Movie | null> {
        const movie = await prisma.movie.findFirst({
            take: 1,
            skip: index
        });
        return movie ? this.mapToDomainMovie(movie) : null;
    }

    private mapToDomainMovie(prismaMovie: PrismaMovie): Movie {
        return {
            id: prismaMovie.id,
            title: prismaMovie.title,
            description: prismaMovie.description,
            videoUrl: prismaMovie.videoUrl,
            thumbnailUrl: prismaMovie.thumbnailUrl,
            genre: prismaMovie.genre,
            duration: prismaMovie.duration,
        }
    }
}
