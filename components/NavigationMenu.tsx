"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationMenuItem {
  label: string;
  path: string;
}

interface NavigationMenuProps {
  items: NavigationMenuItem[];
}

export default function NavigationMenu({ items }: NavigationMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-8">
      {items.map((item, index) => (
        <Link
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          href={item.path}
          className={
            pathname === item.path
              ? "font-bold text-gray-300 underline underline-offset-4"
              : "hover:text-gray-300"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
