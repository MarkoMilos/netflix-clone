"use client";

import Image from "next/image";
import NavBarItem from "@/components/NavBarItem";
import {BsBell, BsChevronDown, BsSearch} from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import {useCallback, useEffect, useState} from "react";
import AccountMenu from "@/components/AccountMenu";

const TOP_OFFSET = 66;

export default function NavBar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <nav className="w-full fixed z-40">

            <div className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>

                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width="150"
                    height="50"
                    priority
                />

                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavBarItem label="Home" path={"/"}/>
                    <NavBarItem label="Series" path={"/shows"}/>
                    <NavBarItem label="Films" path={"/movies"}/>
                    <NavBarItem label="New & Popular" path={"/latest"}/>
                    <NavBarItem label="My List" path={"/mylist"}/>
                    <NavBarItem label="Browse by languages" path={"/browse"}/>
                </div>

                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>

                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch/>
                    </div>

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell/>
                    </div>

                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <Image
                                src="/images/profile.png"
                                alt="avatar"
                                width="100"
                                height="100"
                            />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>

            </div>
        </nav>
    )
}
