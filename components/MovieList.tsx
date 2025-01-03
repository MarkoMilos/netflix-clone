import { isEmpty } from "lodash";

import ContentCard from "@/components/ContentCard";
import { Movie } from "@/types";

interface MovieListProps {
  movies: Movie[];
  title: string;
}

export default function MovieList({ movies, title }: MovieListProps) {
  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div className="mt-4 space-y-8 px-4 md:px-12">
      <div>
        <p className="text-md relative mb-4 font-semibold text-white md:text-xl lg:text-2xl">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map(movie => (
            <ContentCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
