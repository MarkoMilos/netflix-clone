import { NextResponse } from "next/server";

import movieRepository from "@/repository/MovieRepository";

/* eslint-disable import/prefer-default-export */
export async function GET() {
  const movies = await movieRepository.getAll();
  return NextResponse.json(movies, { status: 200 });
}
