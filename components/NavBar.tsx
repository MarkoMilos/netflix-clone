"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavBarItem from "@/components/NavBarItem";

const TOP_OFFSET = 66;

export default function NavBar() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed z-40 h-auto min-h-[70px] w-full">
      <div
        className={`flex h-[41px] flex-row items-center bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] px-[4%] transition duration-500 lg:h-[68px] xl:px-[60px] ${
          showBackground ? "bg-opacity/90 bg-zinc-900" : ""
        }`}
      >
        <Link href="/" className="mr-[5px] cursor-pointer lg:mr-[25px]">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={90}
            height={30}
            priority
            className="w-[40px] sm:w-[50px] md:w-[70px] lg:w-[90px]"
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
          <p className="text-[0.7rem] font-medium text-white">Browse</p>
          <BsChevronDown className="size-[10px] rotate-0 text-white transition group-hover:rotate-180" />
          <div className="absolute left-0 top-0 ml-[-90px] hidden pt-12 group-hover:block">
            <MobileMenu />
          </div>
        </div>

        <div className="ml-auto flex flex-row items-center gap-6">
          <div className="size-6 cursor-pointer text-white transition hover:text-gray179">
            <BsSearch />
          </div>

          <div className="size-6 cursor-pointer text-white transition hover:text-gray179">
            <BsBell />
          </div>

          <div className="group/menu relative flex cursor-pointer flex-row items-center gap-2">
            <Image
              src="/images/profile1.png"
              alt="avatar"
              width={32}
              height={32}
              className="size-8 rounded-md"
            />
            <BsChevronDown className="rotate-0 text-white transition group-hover/menu:rotate-180" />
            <div className="absolute right-0 top-0 hidden pt-12 group-hover/menu:block">
              <AccountMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
