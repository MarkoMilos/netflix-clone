import Billboard from "@/components/Billboard";
import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import InfoModal from "@/components/InfoModal";
import mapMovieToContentItem from "@/lib/mapper";
import contentService from "@/service/ContentService";
import TMDBService from "@/service/TMDBService";

export default async function HomePage() {
  // Fetch a random trending movie for the billboard
  const billboardMovie = await contentService.getRandomTrendingMovie();

  // TODO we can move home data composition logic to a content service

  // Fetch popular movies, trending movies, and genre movies in parallel
  const [popularMovies, trendingMovies, genreMovies] = await Promise.all([
    TMDBService.getPopularMovies(),
    TMDBService.getTrendingMovies(),
    TMDBService.getMoviesForAllGenres(),
  ]);

  // Map movies to ContentItems
  const popularItems = popularMovies.map(mapMovieToContentItem);
  const trendingItems = trendingMovies.map(mapMovieToContentItem);
  const genreItems = genreMovies.map(genreMovie => ({
    ...genreMovie,
    movies: genreMovie.movies.map(mapMovieToContentItem),
  }));

  return (
    <>
      <InfoModal />

      <div className="relative mb-[20px] w-full pb-[40%]">
        <div className="absolute h-[56.25vw] w-full">
          <Billboard data={billboardMovie} />
        </div>
      </div>

      <div className="relative pb-40">
        <div className="my-[3vw]">
          <ContentCarousel title="Popular on Netflix" data={popularItems} />
        </div>

        <div className="my-[3vw]">
          <ContentCarousel title="Trending Now" data={trendingItems} />
        </div>

        {genreItems.map(
          ({ genre, movies }) =>
            movies.length > 0 && (
              <div key={genre.id} className="my-[3vw]">
                <ContentCarousel title={genre.name} data={movies} />
              </div>
            ),
        )}
      </div>
    </>
  );
}
