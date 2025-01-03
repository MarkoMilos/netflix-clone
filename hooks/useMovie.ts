import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { Movie } from "@/types";

const useMovie = (movieId: string) => {
  const { data, error, isLoading } = useSWR<Movie>(
    movieId ? `/api/movies/${movieId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
