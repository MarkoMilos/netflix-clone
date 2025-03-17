const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export type TMDBBackdropSize = "w300" | "w780" | "w1280" | "original";
export type TMDBPosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
export type TMDBLogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";

export function getBackdropUrl(
  path: string | null,
  size: TMDBBackdropSize = "original",
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : undefined;
}

export function getPosterUrl(
  path: string | null,
  size: TMDBPosterSize = "original",
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : undefined;
}

export function getLogoUrl(
  path: string | null,
  size: TMDBLogoSize = "original",
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : undefined;
}
