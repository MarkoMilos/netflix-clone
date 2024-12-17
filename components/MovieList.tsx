import {isEmpty} from "lodash";
import ContentCard from "@/components/ContentCard";
import {Movie} from "@/types";

interface MovieListProps {
    movies: Movie[]
    title: string
}

export default function MovieList({movies, title}: MovieListProps) {
    if (isEmpty(movies)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {movies.map((movie) => (
                        <ContentCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
