import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {Movie} from "@/types";

const useFavourites = (initialData?: Movie[]) => {
    const {data, error, isLoading, mutate} = useSWR<Movie[]>("/api/favourites", fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        fallbackData: initialData
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useFavourites;
