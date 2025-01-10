import useSWR, { Fetcher } from "swr";

import profileService from "@/service/ProfileService";
import { Profile } from "@/types";

// TODO remove this mockFetcher, create api endpoint
const mockFetcher: Fetcher<Profile> = async () => profileService.getCurrentProfile();

const useCurrentProfile = () => {
  const { data, error } = useSWR<Profile>("/api/profile", mockFetcher);
  return {
    data,
    error,
  };
};

export default useCurrentProfile;
