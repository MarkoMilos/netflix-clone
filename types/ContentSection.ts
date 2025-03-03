import { ContentItem } from "./ContentItem";

export type ContentSection = {
  label: string;
  content: ContentItem[];
  type: "standard" | "ranked";
};
