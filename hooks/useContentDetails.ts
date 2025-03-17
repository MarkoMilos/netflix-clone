import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { mapMovieToContent } from "@/lib/mapper";
import { Movie } from "@/types";

const useContentDetails = (contentId?: number) => {
  // Currently we are using only movies, TV shows can be added later
  const {
    data: movieData,
    error,
    isLoading,
  } = useSWR<Movie>(contentId ? `/api/movies/${contentId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  // Map the movie data to content type
  const data = movieData ? mapMovieToContent(movieData) : undefined;

  return {
    data,
    error,
    isLoading,
  };
};

export default useContentDetails;
