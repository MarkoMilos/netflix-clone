import Icon from "@/components/Icons";

// Like button without any functionality
export default function LikeButton() {
  return (
    <button
      type="button"
      className="m-[0.25em] rounded-full border-2 border-white/70 bg-[#2a2a2a]/60 p-[0.8rem] text-white hover:border-white"
    >
      <Icon name="like" className="size-[1.6rem]" />
    </button>
  );
}
