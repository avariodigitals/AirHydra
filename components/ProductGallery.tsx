"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface GalleryImage {
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  gallery: {
    headline: string;
    subheadline: string;
    images: GalleryImage[];
  };
}

export default function ProductGallery({ gallery }: ProductGalleryProps) {
  const { images } = gallery;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() =>
    setActive((a) => (a === images.length - 1 ? 0 : a + 1)), [images.length]);
  const prev = () =>
    setActive((a) => (a === 0 ? images.length - 1 : a - 1));

  const goTo = (i: number) => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setActive(i);
    setPaused(true);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 5000);
  };

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  if (!images?.length) return null;

  return (
    <section className="py-14 lg:py-24 bg-cream-light">
      <div className="container mx-auto px-5 lg:px-6">
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">The Product</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-tight text-[#1a1a1a]">
            {gallery.headline}
          </h2>
          {gallery.subheadline && (
            <p className="text-sm lg:text-base text-[#4b5563] max-w-lg mx-auto leading-relaxed mt-3">
              {gallery.subheadline}
            </p>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main image */}
          <div
            className="relative rounded-3xl overflow-hidden bg-cream border border-[#2E6EBB]/10 shadow-card aspect-[4/3] mb-5 cursor-pointer"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; setPaused(true); }}
            onTouchEnd={(e) => {
              const diff = touchStart.current - e.changedTouches[0].clientX;
              if (diff > 40) next();
              else if (diff < -40) prev();
              setPaused(false);
            }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-white transition-colors z-10"
            >
              <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-white transition-colors z-10"
            >
              <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center mb-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className={`rounded-2xl overflow-hidden border-2 transition-all duration-200 aspect-square w-20 shrink-0 ${
                  i === active ? "border-[#417BC1] shadow-blue-glow-sm" : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-2 bg-[#417BC1]" : "w-2 h-2 bg-[#2E6EBB]/25 hover:bg-[#2E6EBB]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
