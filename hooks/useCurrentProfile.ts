import useSWR, { Fetcher } from "swr";

import getProfiles from "@/service/ProfileService";
import { Profile } from "@/types";

// TODO remove this mockFetcher, create api endpoint
const mockFetcher: Fetcher<Profile> = () => {
  const profile = getProfiles()[0];
  return Promise.resolve(profile);
};

const useCurrentProfile = () => {
  const { data, error } = useSWR<Profile>("/api/profile", mockFetcher);
  return {
    data,
    error,
  };
};

export default useCurrentProfile;
