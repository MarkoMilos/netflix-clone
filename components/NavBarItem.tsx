import Link from "next/link";

interface NavBarItemProps {
    label: string;
    path?: string;
}

export default function NavBarItem({label, path}: NavBarItemProps) {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {path ? (
                <Link href={path}>
                    {label}
                </Link>
            ) : (
                label
            )}
        </div>
    )
}
