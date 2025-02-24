import { NextResponse } from "next/server";

import contentService from "@/service/ContentService";

/* eslint-disable import/prefer-default-export */
export async function GET() {
  const randomMovie = await contentService.getRandomTrendingMovie();
  return NextResponse.json(randomMovie, { status: 200 });
}
