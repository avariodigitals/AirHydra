"use client";

import React, { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before Flight",
  afterLabel = "After AirHydra"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[2rem] shadow-luxury border border-[#2E6EBB]/10 bg-[#f8fafc]">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-[38rem] sm:h-[44rem] object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-[38rem] sm:h-[44rem] object-cover"
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />

        <div
          className="absolute top-0 bottom-0 w-[1px] bg-white/85 shadow-xl z-10"
          style={{ left: `${sliderPosition}%` }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 border border-white shadow-xl z-20 pointer-events-none flex items-center justify-center text-[#1a1a1a]"
          style={{ left: `calc(${sliderPosition}% - 28px)` }}
        >
          <span className="text-lg font-semibold">⇄</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-transparent p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-white">
            <div>
              <span className="inline-flex items-center uppercase tracking-[0.24em] text-[0.65rem] font-semibold text-white/80">
                Before
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-serif tracking-tight">{beforeLabel}</h3>
            </div>
            <div>
              <span className="inline-flex items-center uppercase tracking-[0.24em] text-[0.65rem] font-semibold text-white/80">
                After
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-serif tracking-tight">{afterLabel}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}