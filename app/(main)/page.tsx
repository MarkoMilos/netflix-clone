import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import ContentCarousel from "@/components/ContentCarousel";
import contentService from "@/service/ContentService";
import TMDBService from "@/service/TMDBService";

export default async function HomePage() {
  const billboardMovie = await contentService.getRandomTrendingMovie();
  const trendingMovies = await TMDBService.getTrendingMovies();

  return (
    <>
      <InfoModal />

      <div className="relative mb-[20px] w-full pb-[40%]">
        <div className="absolute h-[56.25vw] w-full">
          <Billboard data={billboardMovie} />
        </div>
      </div>

      <div className="relative pb-40">
        <ContentCarousel title="Trending" movies={trendingMovies} />
      </div>
    </>
  );
}
