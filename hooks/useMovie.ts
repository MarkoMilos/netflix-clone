import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovie = (movieId: string) => {
    const {data, error, isLoading} = useSWR(movieId ? `/api/movies/${movieId}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    });

    return {
        data,
        error,
        isLoading
    };
}

export default useMovie;
