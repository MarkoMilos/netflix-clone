import useSWR, { Fetcher } from "swr";

import profileService from "@/service/ProfileService";
import { Profile } from "@/types";

// TODO remove this mockFetcher, create api endpoint
const mockFetcher: Fetcher<Profile[]> = async () => profileService.getProfiles();

const useProfiles = () => {
  const { data, error } = useSWR<Profile[]>("/api/profiles", mockFetcher);
  return {
    data,
    error,
  };
};

export default useProfiles;
