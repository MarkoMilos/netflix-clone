import { Profile } from "@/types";

// TODO: Fetch profiles from an API / database

const profileService = {
  async getProfiles(): Promise<Profile[]> {
    return [
      {
        id: "1",
        name: "John Doe",
        image: "/images/profile1.png",
      },
      {
        id: "2",
        name: "Marry Jane",
        image: "/images/profile2.png",
      },
      {
        id: "3",
        name: "Kids",
        image: "/images/profile-kids.png",
      },
    ];
  },

  async getCurrentProfile(): Promise<Profile> {
    return {
      id: "1",
      name: "John Doe",
      image: "/images/profile1.png",
    };
  },
};

export default profileService;
