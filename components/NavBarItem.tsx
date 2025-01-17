"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarItemProps {
  label: string;
  path: string;
}

export default function NavBarItem({ label, path }: NavBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <div
      className={`duration-400 cursor-pointer text-[1.2rem] transition ease-in xl:text-[14px] ${
        isActive ? "font-bold text-white" : "font-light text-white hover:text-gray179"
      }`}
    >
      {path ? <Link href={path}>{label}</Link> : label}
    </div>
  );
}
