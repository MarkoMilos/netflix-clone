import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR("/api/user", fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default useCurrentUser;
