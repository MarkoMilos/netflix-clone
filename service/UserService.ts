import bcrypt from "bcrypt";
import { without } from "lodash";

import movieRepository from "@/repository/MovieRepository";
import userRepository from "@/repository/UserRepository";
import { User } from "@/types";

const userService = {
  /** Create a new user */
  async createUser(email: string, name: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    return userRepository.create(email, name, hashedPassword);
  },

  /** Add a movie to the user's favourite list */
  async addFavouriteMovie(userId: string, movieId: string): Promise<User | null> {
    // Check if user exists
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if movie exists
    const movie = await movieRepository.getById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }

    // Check if movie is already in user's favourites and update the list accordingly
    const updatedFavouriteIds = user.favouriteIds.includes(movieId)
      ? user.favouriteIds
      : [...user.favouriteIds, movieId];

    // Update the user's favourite list
    return userRepository.updateFavouriteIds(userId, updatedFavouriteIds);
  },

  /**  Remove a movie from the user's favourite list */
  async removeFavouriteMovie(userId: string, movieId: string): Promise<User | null> {
    // Check if user exists
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if movie exists
    const movie = await movieRepository.getById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }

    // Remove the movie from the user's favourite list
    const updatedFavouriteIds = without(user.favouriteIds, movieId);

    // Update the user's favourite list
    return userRepository.updateFavouriteIds(userId, updatedFavouriteIds);
  },
};

export default userService;
