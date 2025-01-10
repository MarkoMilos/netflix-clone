import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

import ProfileItem from "@/components/ProfileItem";
import profileService from "@/service/ProfileService";

export default async function Profiles() {
  const profiles = await profileService.getProfiles();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex max-w-[80%] select-none flex-col items-center">
        <h1 className="my-11 text-center text-[2rem] text-white lg:text-[3.5vw]">
          Who&#39;s watching?
        </h1>

        <div className="mb-8 flex items-center justify-center gap-8">
          {profiles.map(profile => (
            <ProfileItem key={profile.id} profile={profile} />
          ))}

          <Link href="/profiles/manage" className="group cursor-pointer">
            <div className="relative size-[10vw] max-h-[200px] min-h-[90px] min-w-[90px] max-w-[200px] rounded-md bg-transparent p-2 hover:bg-gray229 md:p-4 lg:p-6 xl:p-10">
              <FaPlusCircle className="size-full text-gray129" />
            </div>

            <p className="my-[0.6em] text-center text-[12px] text-gray129 group-hover:text-gray229 md:text-[1.3vw] 2xl:text-[24px]">
              Add Profile
            </p>
          </Link>
        </div>

        <Link
          href="/profiles/manage"
          className="mb-4 mt-8 cursor-pointer border border-gray129 px-[1.5em] py-[0.4em] text-[12px] font-light tracking-widest text-gray129 hover:border-gray229 hover:text-gray229 md:text-[1.2vw]"
        >
          Manage Profiles
        </Link>
      </div>
    </div>
  );
}
