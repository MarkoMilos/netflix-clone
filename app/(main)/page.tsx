import Billboard from "@/components/Billboard";
import FavouriteList from "@/components/FavouriteList";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import { authUser } from "@/lib/auth/session";
import movieRepository from "@/repository/MovieRepository";
import movieService from "@/service/MovieService";

export default async function HomePage() {
  const user = await authUser();
  const billboardMovie = await movieService.getRandomMovie();
  const movies = (await movieRepository.getAll()) ?? [];
  const favourites = (await movieRepository.getByIds(user ? user.favouriteIds : [])) ?? [];

  return (
    <>
      <InfoModal />

      <div className="relative mb-[20px] w-full pb-[40%]">
        <div className="absolute h-[56.25vw] w-full">
          <Billboard data={billboardMovie} />
        </div>
      </div>

      <div className="pb-40">
        <MovieList movies={movies} title="Trending Now" />
        <FavouriteList movies={favourites} title="My List" />
      </div>
    </>
  );
}
