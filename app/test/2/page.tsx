import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";

const mockData = [
  { contentId: "1", contentPosterImage: "https://placehold.co/350x200?text=1" },
  { contentId: "2", contentPosterImage: "https://placehold.co/350x200?text=2" },
  { contentId: "3", contentPosterImage: "https://placehold.co/350x200?text=3" },
  { contentId: "4", contentPosterImage: "https://placehold.co/350x200?text=4" },
  { contentId: "5", contentPosterImage: "https://placehold.co/350x200?text=5" },
  { contentId: "6", contentPosterImage: "https://placehold.co/350x200?text=6" },
  { contentId: "7", contentPosterImage: "https://placehold.co/350x200?text=7" },
  { contentId: "8", contentPosterImage: "https://placehold.co/350x200?text=8" },
  { contentId: "9", contentPosterImage: "https://placehold.co/350x200?text=9" },
  { contentId: "10", contentPosterImage: "https://placehold.co/350x200?text=10" },
  { contentId: "11", contentPosterImage: "https://placehold.co/350x200?text=11" },
  { contentId: "12", contentPosterImage: "https://placehold.co/350x200?text=12" },
  { contentId: "13", contentPosterImage: "https://placehold.co/350x200?text=13" },
  { contentId: "14", contentPosterImage: "https://placehold.co/350x200?text=14" },
  { contentId: "15", contentPosterImage: "https://placehold.co/350x200?text=15" },
];

export default function TestPage() {
  return <ContentCarousel title="Your next watch" data={mockData} />;
}
