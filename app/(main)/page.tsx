"use client";

import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function HomePage() {
    // TODO this can be rendered on the server
    const {data: movies = []} = useMovieList();
    const {data: favourites = []} = useFavourites();

    // TODO do we need this info modal here?
    const {isOpen, closeModal} = useInfoModal();

    return (
        <>
            <InfoModal
                visible={isOpen}
                onClose={closeModal}
            />
            <Billboard/>
            <div className="pb-40">
                <MovieList movies={movies} title="Trending Now"/>
                <MovieList movies={favourites} title="My List"/>
            </div>
        </>
    );
}
