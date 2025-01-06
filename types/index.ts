export type User = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  favouriteIds: string[];
};

export type Profile = {
  id: string;
  name: string;
  image: string;
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
};
