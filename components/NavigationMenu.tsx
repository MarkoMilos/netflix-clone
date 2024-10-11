'use client';

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

interface NavigationMenuItem {
    label: string;
    path: string;
}

interface NavigationMenuProps {
    items: NavigationMenuItem[];
}

export default function NavigationMenu({items}: NavigationMenuProps) {
    const pathname = usePathname()

    return (
        <nav className="flex space-x-8">
            {items.map((item, index) => (
                <Link key={index} href={item.path}
                      className={pathname === item.path ? "text-gray-300 underline underline-offset-4 font-bold" : "hover:text-gray-300"}>
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}
