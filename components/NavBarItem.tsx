import Link from "next/link";

interface NavBarItemProps {
  label: string;
  path: string;
}

export default function NavBarItem({ label, path }: NavBarItemProps) {
  return (
    <div className="cursor-pointer text-white transition hover:text-gray-300">
      {path ? <Link href={path}>{label}</Link> : label}
    </div>
  );
}
