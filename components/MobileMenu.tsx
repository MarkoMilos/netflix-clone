"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoTriangleUp } from "react-icons/go";

interface MobileMenuProps {
  className?: string;
}

const links = [
  { label: "Home", path: "/" },
  { label: "Series", path: "/shows" },
  { label: "Films", path: "/movies" },
  { label: "New & Popular", path: "/latest" },
  { label: "My List", path: "/mylist" },
  { label: "Browse by languages", path: "/browse" },
];

export default function MobileMenu({ className = "" }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "relative flex w-[260px] flex-col border border-white/15 bg-black/90",
        className,
      )}
    >
      <div className="absolute top-[-16px] flex w-full items-center justify-center text-gray229">
        <GoTriangleUp size={22} />
      </div>

      <div className="absolute top-[-2px] h-[2px] w-full bg-gray229" />

      {links.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={clsx(
            "flex h-[50px] w-full items-center justify-center text-[13px] hover:bg-white/5",
            {
              "font-bold text-white": pathname === path,
              "text-gray179": pathname !== path,
            },
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
