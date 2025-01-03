import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/watch/${movieId}`)}
      className="flex w-auto flex-row items-center rounded-md bg-white/30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/20 md:px-4 md:py-2 lg:text-lg"
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </button>
  );
}
