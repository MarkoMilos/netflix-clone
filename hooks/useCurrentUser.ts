import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import {User} from "@/types";

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR<User>("/api/user", fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default useCurrentUser;
