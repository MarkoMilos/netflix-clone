"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function TestPage() {
  const [opacity, setOpacity] = useState(0); // Start fully hidden
  const [duration, setDuration] = useState(0); // Duration of the video (set by player)
  const fadeInThreshold = 1; // Fade in seconds after video starts
  const fadeOutThreshold = 3; // Fade out seconds before video ends

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), fadeInThreshold * 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    if (opacity === 1 && state.playedSeconds >= duration - fadeOutThreshold) {
      setOpacity(0);
    }
  };

  return (
    <div className="relative h-[56.25vw] w-full overflow-hidden border-2 border-red-600">
      {/* Background movie poster image */}
      <div className="absolute inset-0 size-full bg-orange-500" />

      {/* Foreground trailer player */}
      <ReactPlayer
        // url="https://www.youtube.com/embed/BB49x_uMlGA"
        url="https://www.youtube.com/embed/BLjvq2mlxBw"
        // url="https://www.youtube.com/embed/szby7ZHLnkA"
        // url="https://www.youtube.com/embed/4rgYUipGJNo"
        width="100%"
        height="100%"
        playing
        muted
        controls={false} // Hides YouTube controls
        pip={false} // Disables Picture-in-Picture
        config={{
          youtube: {
            playerVars: {
              autoplay: 1, // Auto-play
              modestbranding: 1, // Remove YouTube branding
              disablekb: 1, // Disable keyboard shortcuts
              controls: 0, // Hide player controls
              showinfo: 0, // Hide title & uploader info
              fs: 0, // Disable fullscreen button
              rel: 0, // Disable related videos at the end
              iv_load_policy: 3, // Hide annotations
              playsinline: 1, // Play inline on mobile
              mute: 1, // Mute video
            },
          },
          // file: {
          //   attributes: {
          //     style: {
          //       width: "100%",
          //       height: "100%",
          //       objectFit: "cover",
          //     },
          //   },
          // },
        }}
        onDuration={handleDuration}
        onProgress={handleProgress}
        style={{
          opacity,
          transition: "opacity 2s ease-in-out",
          // position: "relative",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.38)", // Scale up slightly
          width: "110%", // Extend width slightly beyond 100%
          height: "110%", // Extend height slightly beyond 100%
          overflow: "hidden",
        }}
      />

      {/* Layer preventing player controls */}
      <div className="absolute inset-0" onContextMenu={e => e.preventDefault()} />
    </div>
  );
}
