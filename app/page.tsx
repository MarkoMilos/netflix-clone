import MovieGrid from "@/components/MovieGrid";
import {fetchMovies} from "@/data/api";

export default async function BrowsePage() {
    const movies = await fetchMovies()

    return (
        <div className="px-4">
            <MovieGrid movies={movies}/>
        </div>
    )
}
