"use client";

import clsx from "clsx";
import Image from "next/image";
import { signOut } from "next-auth/react";

import Icon from "@/components/Icons";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import useProfiles from "@/hooks/useProfiles";

interface AccountMenuProps {
  className?: string;
}

export default function AccountMenu({ className = "" }: AccountMenuProps) {
  const { data: profiles } = useProfiles();
  const { data: currentProfile } = useCurrentProfile();
  const otherProfiles = profiles?.filter(profile => profile.id !== currentProfile?.id);

  return (
    <div className={clsx("flex w-[220px] flex-col border border-white/15 bg-black/90", className)}>
      <div className="w-full pb-[5px] pt-[10px]">
        {otherProfiles?.map(profile => (
          <div
            key={profile.id}
            className="group flex cursor-pointer flex-row items-center px-[10px] py-[5px]"
          >
            <Image
              src={profile.image}
              alt="profile"
              width={32}
              height={32}
              className="mr-[10px] size-[32px] rounded"
            />
            <span className="inline-flex select-none items-center text-[13px] text-white group-hover:underline">
              {profile.name}
            </span>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col pb-[10px]">
        <div className="group flex flex-row px-[10px] py-[5px]">
          <Icon name="edit" className="ml-[5px] mr-[13px] size-[24px] text-gray179" />
          <span className="inline-flex select-none items-center text-[13px] text-white group-hover:underline">
            Manage Profiles
          </span>
        </div>
        <div className="group flex flex-row px-[10px] py-[5px]">
          <Icon name="transfer" className="ml-[5px] mr-[13px] size-[24px] text-gray179" />
          <span className="inline-flex select-none items-center text-[13px] text-white group-hover:underline">
            Transfer Profile
          </span>
        </div>
        <div className="group flex flex-row px-[10px] py-[5px]">
          <Icon name="account" className="ml-[5px] mr-[13px] size-[24px] text-gray179" />
          <span className="inline-flex select-none items-center text-[13px] text-white group-hover:underline">
            Account
          </span>
        </div>
        <div className="group flex flex-row px-[10px] py-[5px]">
          <Icon name="help" className="ml-[5px] mr-[13px] size-[24px] text-gray179" />
          <span className="inline-flex select-none items-center text-[13px] text-white group-hover:underline">
            Help Centre
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => signOut()}
        className="group flex flex-row items-center justify-center border-t border-white/25 py-[10px]"
      >
        <span className="inline-flex select-none items-center px-[10px] py-[5px] text-[13px] text-white group-hover:underline">
          Sign out of Netflix
        </span>
      </button>
    </div>
  );
}
