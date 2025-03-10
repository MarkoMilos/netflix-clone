import axios from "axios";
import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { Content } from "@/types/Content";

export default function useMyList(initialData?: Content[]) {
  const { data, error, isLoading, mutate } = useSWR<Content[]>("/api/my-list", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    fallbackData: initialData,
  });

  const addToMyList = async (content: Content) => {
    await axios.post("/api/my-list", content);
    mutate();
  };

  const removeFromMyList = async (contentId: number) => {
    await axios.delete("/api/my-list", { data: { contentId } });
    mutate();
  };

  return {
    data,
    error,
    isLoading,
    addToMyList,
    removeFromMyList,
    mutate,
  };
}
