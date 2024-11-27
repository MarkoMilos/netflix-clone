import {User} from "@/types";
import {UserRepository} from "@/repository/UserRepository";
import {MovieRepository} from "@/repository/MovieRepository";
import {without} from "lodash";
import bcrypt from "bcrypt";

export class UserService {

    private readonly userRepository = new UserRepository();
    private readonly movieRepository = new MovieRepository();

    async createUser(email: string, name: string, password: string): Promise<User> {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user
        return await this.userRepository.create(email, name, hashedPassword);
    }

    async addFavouriteMovie(userId: string, movieId: string): Promise<User | null> {
        // Check if user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Check if movie exists
        const movie = await this.movieRepository.getById(movieId);
        if (!movie) {
            throw new Error("Movie not found");
        }

        // Check if movie is already in user's favourites and update the list accordingly
        const updatedFavouriteIds = user.favouriteIds.includes(movieId) ? user.favouriteIds : [...user.favouriteIds, movieId];

        // Update the user's favourite list
        return await this.userRepository.updateFavouriteIds(userId, updatedFavouriteIds);
    }

    async removeFavouriteMovie(userId: string, movieId: string): Promise<User | null> {
        // Check if user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Check if movie exists
        const movie = await this.movieRepository.getById(movieId);
        if (!movie) {
            throw new Error("Movie not found");
        }

        const updatedFavouriteIds = without(user.favouriteIds, movieId);

        return await this.userRepository.updateFavouriteIds(userId, updatedFavouriteIds);
    }
}
