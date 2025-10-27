"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;              // e.g. "https://stream.mux.com/<PLAYBACK_ID>.m3u8"
  poster: string;           // e.g. "https://image.mux.com/<PLAYBACK_ID>/thumbnail.jpg"
  caption?: string;
  className?: string;
};

export default function VideoPreview({
  src,
  poster,
  caption = "Watch preview",
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const attachAndPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    // If the browser can play HLS natively (Safari/iOS), just set src
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      await video.play();
      return;
    }

    // For Chrome/Firefox/Edge: use hls.js
    // Lazy-load to keep bundle small
    if (!hlsRef.current) {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.attachMedia(video);
        hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
          hlsRef.current.loadSource(src);
        });

        // (Optional) basic error recovery
        hlsRef.current.on(Hls.Events.ERROR, (_event: any, data: any) => {
          if (data.fatal) {
            switch (data.type) {
              case "networkError":
                hlsRef.current?.startLoad();
                break;
              case "mediaError":
                hlsRef.current?.recoverMediaError();
                break;
              default:
                hlsRef.current?.destroy();
                hlsRef.current = null;
            }
          }
        });
      } else {
        // Fallback: if hls.js isn't supported, try setting src directly
        video.src = src;
      }
    }

    await video.play();
  };

  const handlePlay = async () => {
    try {
      setIsPlaying(true);
      await attachAndPlay();
    } catch {
      // If something fails, show native controls so the user can retry
      setIsPlaying(false);
      videoRef.current?.setAttribute("controls", "true");
    }
  };

  const handlePause = () => setIsPlaying(false);

  return (
    <div className={`w-full flex flex-col items-center ${className ?? ""}`}>
      <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px]">
        {/* 9:16 container */}
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black">
          {/* Poster image until playing */}
          {!isPlaying && (
            <Image
              src={poster}
              alt="Video preview"
              fill
              className="object-cover select-none pointer-events-none"
              priority={false}
            />
          )}

          {/* Video element (source attached dynamically) */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            preload="none"
            playsInline
            controls={isPlaying}  // show controls after we start playing
            muted={false}         // user-initiated play, so can be unmuted
            onPause={handlePause}
            poster={poster}
          />

          {/* Play button overlay */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 grid place-items-center focus:outline-none"
            >
              <span className="rounded-full p-5 md:p-6 bg-[#e5ff00] text-black shadow-lg transition active:scale-95">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* ✏️ Caption removed
        {caption && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {caption}
          </p>
        )}
        */}
      </div>
    </div>
  );
}
