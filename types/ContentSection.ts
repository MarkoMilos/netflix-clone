import { Content } from "./Content";

export type ContentSection = {
  label: string;
  content: Content[];
  type: "standard" | "ranked";
};
