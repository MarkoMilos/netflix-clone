"use client";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/Icons";
import LikeButton from "@/components/LikeButton";
import MyListButton from "@/components/MyListButton";
import PlayButton from "@/components/PlayButton";
import SimilarContentCard from "@/components/SimilarContentCard";
import useContentDetails from "@/hooks/useContentDetails";
import useInfoModal from "@/hooks/useInfoModal";
import { getBackdropUrl, getLogoUrl } from "@/lib/tmdb-image";

export default function InfoModal() {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { contentId, isOpen, closeModal } = useInfoModal();
  const { data: content, isLoading } = useContentDetails(contentId);

  useEffect(() => {
    const targetElement = modalRef.current;

    if (isOpen && targetElement) {
      // Disable body scroll when the modal is open to prevent scrolling on the background
      disableBodyScroll(targetElement, { reserveScrollBarGap: true });
      // Delay setting isVisible to true to trigger animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      // Cleanup
      return () => {
        if (targetElement) {
          enableBodyScroll(targetElement);
        }
        clearTimeout(timer);
      };
    }

    return () => {};
  }, [isOpen]);

  const handleClose = useCallback(() => {
    // Set visible to false to trigger the animation
    setIsVisible(false);
    // Call close that will set visible to false after 300ms to allow the animation to finish
    setTimeout(() => {
      closeModal();
    }, 300);
  }, [closeModal]);

  // If the modal is not open don't render anything
  if (!isOpen) return null;

  return (
    // Modal window adding a transition to the background color
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={modalRef}
      onClick={handleClose}
      className={`${isVisible ? "bg-black/80" : "bg-transparent"} fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden transition duration-300`}
    >
      {/* Modal dialog container */}
      <div
        className={`${isVisible ? "scale-100" : "scale-0"} relative my-[25px] w-[90%] overflow-hidden rounded-[6px] drop-shadow-xl duration-300 lg:w-[900px]`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-[#181818]"
        >
          <Icon name="plus" className="size-6 rotate-45" />
        </button>
        {!isLoading && content ? (
          // Loaded content container
          <div className="relative w-full">
            {/* Image and actions container */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getBackdropUrl(content.backDropImage)}
                alt="Backdrop"
                className="aspect-video w-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

              <div className="absolute bottom-[5%] left-[3em] w-2/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getLogoUrl(content?.images?.logos[0]?.file_path ?? null)}
                  alt="Logo"
                  className="mb-[1.5em] w-full"
                />

                {/* Action buttons */}
                <div className="mb-[1em] flex flex-row items-center">
                  <PlayButton className="m-[0.25em]" contentId={1} />
                  <MyListButton content={content} />
                  <LikeButton />
                </div>

                {/* Spacing to match Netflix DOM */}
                <div className="h-[20px] w-full" />
              </div>
            </div>

            {/* Info container */}
            <div className="bg-[#181818] px-12 pb-10">
              <div className="flex w-full gap-[2em]">
                {/* Left column */}
                <div className="w-2/3">
                  {/* Meta info */}
                  <div className="my-[0.8em] flex flex-row items-center gap-[0.5em] text-[16px] text-[#bcbcbc]">
                    <p>{content?.releaseYear}</p>
                    <p>Rating: {content?.voteRating?.toFixed(1)}</p>
                    <span className="whitespace-nowrap rounded-[3px] border border-white/40 px-[0.5em] text-[0.7em] leading-[1.2] text-white/90">
                      HD
                    </span>
                    <Icon name="spatial" />
                    <Icon className="size-[2em]" name="dolby" />
                    <Icon className="size-[1em]" name="subtitles" />
                  </div>

                  {/* Description */}
                  <div className="mb-[0.5em] mt-[1em] text-[16px] leading-[26px] text-white">
                    {content?.overview}
                  </div>
                </div>

                {/* Right column */}
                <div className="flex w-1/3 flex-col">
                  {/* Cast section */}
                  <div className="my-2 mr-2 break-words text-[14px] leading-[20px] text-white">
                    <span className="text-[#777777]">Cast: </span>
                    {content?.cast?.slice(0, 3).map((actor, index) => (
                      <span key={actor.id}>
                        {actor.name}
                        {index < 2 && ", "}
                      </span>
                    ))}
                    {(content?.cast?.length ?? 0) > 3 && <span className="italic">, more</span>}
                  </div>

                  {/* Genres section */}
                  <div className="my-2 mr-2 break-words text-[14px] leading-[20px] text-white">
                    <span className="text-[#777777]">Genres: </span>
                    {content?.genres?.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index < (content?.genres?.length ?? 0) - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* More like this section */}
              <h1 className="mb-[20px] mt-[48px] text-[24px] font-medium text-white">
                More Like This
              </h1>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {content?.similar
                  ?.slice(0, 9)
                  .map(similarContent => (
                    <SimilarContentCard key={similarContent.id} content={similarContent} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          // Loading skeleton
          <div className="relative h-screen w-full bg-[#181818]">
            <div className="aspect-video w-full animate-pulse bg-gray-700" />
            <div className="px-12 pb-10">
              <div className="flex w-full gap-[2em]">
                {/* Left column skeleton */}
                <div className="w-2/3">
                  <div className="my-[0.8em] flex gap-2">
                    <div className="h-6 w-20 animate-pulse rounded bg-gray-700" />
                    <div className="h-6 w-20 animate-pulse rounded bg-gray-700" />
                  </div>
                  <div className="mt-4 h-24 w-full animate-pulse rounded bg-gray-700" />
                </div>
                {/* Right column skeleton */}
                <div className="w-1/3">
                  <div className="my-4 h-5 w-3/4 animate-pulse rounded bg-gray-700" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
