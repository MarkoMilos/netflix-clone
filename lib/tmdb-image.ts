const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export type TMDBBackdropSize = "w300" | "w780" | "w1280" | "original";
export type TMDBPosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

export function getBackdropUrl(
  path: string | null,
  size: TMDBBackdropSize = "original",
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}

export function getPosterUrl(
  path: string | null,
  size: TMDBPosterSize = "original",
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}
