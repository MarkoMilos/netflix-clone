import { redirect } from "next/navigation";

import MyList from "@/components/MyList";
import { authUser } from "@/lib/auth/session";
import { getMyList } from "@/service/MyListService";

export default async function MyListPage() {
  const user = await authUser();
  if (!user) return redirect("/login");

  const content = await getMyList(user.id);

  return <MyList initialData={content} />;
}
