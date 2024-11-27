import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import {Movie} from "@/types";

const useMovieList = () => {
    const {data, error, isLoading} = useSWR<Movie[]>("/api/movies", fetcher, {
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

export default useMovieList;
