export type User = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
