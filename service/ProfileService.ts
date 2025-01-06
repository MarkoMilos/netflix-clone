import { Profile } from "@/types";

export default function getProfiles(): Profile[] {
  // TODO: Fetch profiles from an API / database
  return [
    {
      id: "1",
      name: "Marko i Tina",
      image: "/images/profile1.png",
    },
    {
      id: "2",
      name: "Starci",
      image: "/images/profile2.png",
    },
    {
      id: "3",
      name: "Kids",
      image: "/images/profile-kids.png",
    },
  ];
}
