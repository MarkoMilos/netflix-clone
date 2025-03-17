import { mapPrismaContentToContent } from "@/lib/mapper";
import prisma from "@/lib/prismadb";
import { Content } from "@/types/Content";

export async function addToMyList(userId: string, content: Content): Promise<Content> {
  // First use upsert to create or update the content
  await prisma.content.upsert({
    where: { id: content.id },
    update: {
      title: content.title,
      overview: content.overview,
      posterImage: content.posterImage,
      backDropImage: content.backDropImage,
      voteRating: content.voteRating,
    },
    create: {
      id: content.id,
      title: content.title,
      overview: content.overview,
      posterImage: content.posterImage,
      backDropImage: content.backDropImage,
      releaseYear: content.releaseYear,
      voteRating: content.voteRating,
      genre_ids: content.genre_ids || [],
      // Store genres as JSON string
      genres: content.genres ? JSON.parse(JSON.stringify(content.genres)) : undefined,
    },
  });

  // Create the myList item
  const result = await prisma.myList.create({
    data: {
      userId,
      contentId: content.id,
    },
    include: {
      content: true,
    },
  });

  return mapPrismaContentToContent(result.content);
}

export async function removeFromMyList(userId: string, contentId: number) {
  return prisma.myList.delete({
    where: {
      userId_contentId: {
        userId,
        contentId,
      },
    },
  });
}

export async function getMyList(userId: string): Promise<Content[]> {
  const myList = await prisma.myList.findMany({
    where: { userId },
    include: { content: true },
    orderBy: { addedAt: "desc" },
  });

  return myList.map(item => mapPrismaContentToContent(item.content));
}

const myListService = {
  addToMyList,
  removeFromMyList,
  getMyList,
};

export default myListService;
