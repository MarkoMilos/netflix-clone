import ContentRankCard from "@/components/ContentRankCard/ContentRankCard";

export default function TestPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center overflow-visible px-[60px]">
      <div className="w-[16.6666%] overflow-visible">
        <ContentRankCard
          content={{
            id: 1,
            title: "Title",
            posterImage: "https://placehold.co/100",
            backDropImage: "https://placehold.co/100",
            releaseYear: "2021",
            voteRating: 5,
            genres: [{ id: 1, name: "Action" }],
          }}
          rank={4}
        />
      </div>
    </div>
  );
}
