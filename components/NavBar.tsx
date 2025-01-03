"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavBarItem from "@/components/NavBarItem";

const TOP_OFFSET = 66;

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(current => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${showBackground ? "bg-opacity/90 bg-zinc-900" : ""} `}
      >
        <Image src="/images/logo.png" alt="logo" width="150" height="50" priority />

        <div className="ml-8 hidden flex-row gap-7 lg:flex">
          <NavBarItem label="Home" path="/" />
          <NavBarItem label="Series" path="/shows" />
          <NavBarItem label="Films" path="/movies" />
          <NavBarItem label="New & Popular" path="/latest" />
          <NavBarItem label="My List" path="/mylist" />
          <NavBarItem label="Browse by languages" path="/browse" />
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          className="relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden"
        >
          <p className="text-sm text-white">Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </button>

        <div className="ml-auto flex flex-row items-center gap-7">
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsSearch />
          </div>

          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsBell />
          </div>

          <button
            type="button"
            onClick={toggleAccountMenu}
            className="relative flex cursor-pointer flex-row items-center gap-2"
          >
            <div className="size-6 overflow-hidden rounded-md lg:size-10">
              <Image src="/images/profile.png" alt="avatar" width="100" height="100" />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`}
            />
            <AccountMenu visible={showAccountMenu} />
          </button>
        </div>
      </div>
    </nav>
  );
}
