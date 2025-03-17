import Link from "next/link";

import Icon from "@/components/Icons";

interface PlayButtonProps {
  contentId: number;
  className?: string;
}

export default function PlayButton({ contentId, className = "" }: PlayButtonProps) {
  return (
    <Link
      href={`/watch/${contentId}`}
      className={`flex cursor-pointer flex-row items-center gap-4 rounded-[4px] bg-white py-[0.8rem] pl-8 pr-[2.4rem] hover:bg-white/75 ${className}`}
    >
      <Icon name="play" className="size-[2.4rem]" />
      <span className="select-none text-[1.6rem] font-medium text-black">Play</span>
    </Link>
  );
}
