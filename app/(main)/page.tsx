import Billboard from "@/components/Billboard";
import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import InfoModal from "@/components/InfoModal";
import contentService from "@/service/ContentService";

export default async function HomePage() {
  const [billboardMovie, homepageContent] = await Promise.all([
    contentService.getHomePageBillboard(),
    contentService.getHomepageContent(),
  ]);

  return (
    <>
      <InfoModal />

      <div className="relative mb-[20px] w-full pb-[40%]">
        <div className="absolute h-[56.25vw] w-full">
          <Billboard data={billboardMovie} />
        </div>
      </div>

      <div className="relative pb-40">
        {homepageContent.map(section => (
          <div key={section.label} className="my-[3vw]">
            <ContentCarousel label={section.label} content={section.content} type={section.type} />
          </div>
        ))}
      </div>
    </>
  );
}
