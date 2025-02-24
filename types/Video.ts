export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; // YouTube video key
  site: string; // e.g., "YouTube"
  size: number;
  type: string; // e.g., "Trailer", "Teaser", etc.
  official: boolean;
  published_at: string;
  id: string;
};
