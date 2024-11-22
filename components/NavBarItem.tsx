interface NavBarItemProps {
    label: string;
}

export default function NavBarItem({label}: NavBarItemProps) {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}
