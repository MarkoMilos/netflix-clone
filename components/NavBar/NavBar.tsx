import Image from "next/image";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

import NavBarBackground from "./NavBarBackground";
import NavBarItem from "./NavBarItem";
import AccountMenu from "@/components/AccountMenu";
import Icon from "@/components/Icons";
import MobileMenu from "@/components/MobileMenu";
import profileService from "@/service/ProfileService";

export default async function NavBar() {
  const profiles = await profileService.getProfiles();
  const currentProfile = await profileService.getCurrentProfile();

  return (
    <nav className="fixed z-40 h-auto min-h-[70px] w-full">
      <NavBarBackground />
      <div className="flex h-[41px] flex-row items-center px-[4%] transition duration-500 lg:h-[68px] xl:px-[60px]">
        <Link href="/" className="mr-[5px] cursor-pointer lg:mr-[25px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-auto w-[40px] sm:w-[50px] md:w-[70px] lg:w-[90px]"
          />
        </Link>

        <div className="hidden flex-row gap-[18px] pl-[18px] xmd:flex xl:gap-[20px] xl:pl-[20px]">
          <NavBarItem label="Home" path="/" />
          <NavBarItem label="Series" path="/shows" />
          <NavBarItem label="Films" path="/movies" />
          <NavBarItem label="New & Popular" path="/latest" />
          <NavBarItem label="My List" path="/mylist" />
          <NavBarItem label="Browse by languages" path="/browse" />
        </div>

        <div className="group relative ml-[18px] flex cursor-pointer flex-row items-center gap-[5px] xmd:hidden">
          <p className="text-[1.2rem] font-medium text-white">Browse</p>
          <BsChevronDown className="size-[10px] rotate-0 text-white transition group-hover:rotate-180" />
          <div className="absolute left-0 top-0 ml-[-90px] hidden pt-24 group-hover:block">
            <MobileMenu />
          </div>
        </div>

        <div className="ml-auto flex flex-row items-center gap-6">
          <Icon name="search" className="size-[24px] cursor-pointer text-white" />

          <Icon name="bell" className="size-[24px] cursor-pointer text-white" />

          <div className="group/menu relative flex cursor-pointer flex-row items-center gap-2">
            <Image
              src="/images/profile1.png"
              alt="avatar"
              width={32}
              height={32}
              className="rounded-[4px]"
            />
            <BsChevronDown className="hidden rotate-0 text-white transition group-hover/menu:rotate-180 md:inline-block" />
            <div className="absolute right-0 top-0 hidden pt-[52px] group-hover/menu:block">
              <AccountMenu currentProfile={currentProfile} profiles={profiles} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
