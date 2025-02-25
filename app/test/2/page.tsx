import ContentCard from "@/components/ContentCard/ContentCard";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[300px] aspect-video bg-red-600">
        <ContentCard
          item={{
            contentId: 1,
            contentTitle: "The Shawshank Redemption",
            contentPosterImage:
              "https://image.tmdb.org/t/p/original/avedvodAZUcwqevBfm8p4G2NziQ.jpg",
            contentYear: 1994,
            contentRating: 9.3,
          }}
        />
      </div>
    </div>
  );
}
