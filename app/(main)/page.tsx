import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import FavouriteList from "@/components/FavouriteList";
import {authUser} from "@/lib/auth/session";
import {movieRepository} from "@/repository/MovieRepository";
import {movieService} from "@/service/MovieService";
import MovieGrid from "@/components/MovieGrid/MovieGrid";

export default async function HomePage() {
    const user = await authUser();
    const billboardMovie = await movieService.getRandomMovie();
    const movies = await movieRepository.getAll() ?? [];
    const favourites = await movieRepository.getByIds(user ? user.favouriteIds : []) ?? [];

    return (
        <>
            <InfoModal/>

            <div className="w-full pb-[40%] relative">
                <Billboard data={billboardMovie}/>
            </div>

            <div className="pb-40">
                <MovieList movies={movies} title="Trending Now"/>
                <FavouriteList movies={favourites} title="My List"/>

                <div className="w-full mt-12">
                    <MovieGrid movies={movies}/>
                </div>
            </div>
        </>
    );
}
