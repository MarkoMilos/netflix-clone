import { NextResponse } from "next/server";

import movieService from "@/service/MovieService";

/* eslint-disable import/prefer-default-export */
export async function GET() {
  const randomMovie = await movieService.getRandomMovie();
  return NextResponse.json(randomMovie, { status: 200 });
}
