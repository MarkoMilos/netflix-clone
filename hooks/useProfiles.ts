import useSWR, { Fetcher } from "swr";

import getProfiles from "@/service/ProfileService";
import { Profile } from "@/types";

// TODO remove this mockFetcher, create api endpoint
const mockFetcher: Fetcher<Profile[]> = () => {
  const profiles = getProfiles();
  return Promise.resolve(profiles);
};

const useProfiles = () => {
  const { data, error } = useSWR<Profile[]>("/api/profiles", mockFetcher);
  return {
    data,
    error,
  };
};

export default useProfiles;
