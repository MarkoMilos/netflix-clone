"use client";

import NavBar from "@/components/NavBar";
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
    const {isOpen, closeModal} = useInfoModal();

    return (
        <>
            <InfoModal
                visible={isOpen}
                onClose={closeModal}
            />
            <NavBar/>
            <Billboard/>
            <div className="pb-40">
                <MovieList data={movies} title="Trending Now"/>
                <MovieList data={favourites} title="My List"/>
            </div>
        </>
    );
}
