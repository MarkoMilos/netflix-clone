import Image from "next/image";
import Link from "next/link";

import { Profile } from "@/types";

type ProfileItemProps = {
  profile: Profile;
};

export default function ProfileItem({ profile }: ProfileItemProps) {
  return (
    <Link href="/" className="group inline-block cursor-pointer">
      <div className="relative size-[10vw] max-h-[200px] min-h-[90px] min-w-[90px] max-w-[200px]">
        <Image className="relative rounded-md" src={profile.image} alt="profile" fill />

        <div className="absolute inset-0 rounded-md border-4 border-transparent group-hover:border-active" />
      </div>

      <p className="my-[0.6em] text-center text-[12px] text-normal group-hover:text-active md:text-[1.3vw] 2xl:text-[24px]">
        {profile.name}
      </p>
    </Link>
  );
}
