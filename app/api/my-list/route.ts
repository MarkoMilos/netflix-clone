import { NextRequest, NextResponse } from "next/server";

import { authUser } from "@/lib/auth/session";
import { getMyList, addToMyList, removeFromMyList } from "@/service/MyListService";
import { Content } from "@/types";

export async function GET(req: NextRequest) {
  const user = await authUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const myList = await getMyList(user.id);
    return NextResponse.json(myList, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await authUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = (await req.json()) as Content;

  try {
    const updatedList = await addToMyList(user.id, content);
    return NextResponse.json(updatedList, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await authUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { contentId } = await req.json();

  try {
    const result = await removeFromMyList(user.id, contentId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
