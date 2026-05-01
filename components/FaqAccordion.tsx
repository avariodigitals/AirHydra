"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => (
        <div
          key={i}
          className={`rounded-2xl border bg-white shadow-card transition-all duration-300 overflow-hidden ${
            open === i ? "border-[#417BC1]/40" : "border-[#2E6EBB]/10 hover:border-[#2E6EBB]/25"
          }`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 px-6 py-5 text-left group"
          >
            {/* Number badge */}
            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              open === i ? "bg-[#417BC1] text-white" : "bg-[#2E6EBB]/8 text-[#417BC1]"
            }`}>
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="flex-1 text-base lg:text-lg font-serif text-[#1a1a1a] pr-4 leading-snug">
              {faq.question}
            </h3>

            {/* Toggle icon */}
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              open === i ? "bg-[#417BC1] rotate-45" : "border border-[#2E6EBB]/15 group-hover:border-[#417BC1]"
            }`}>
              <svg
                className={`w-3.5 h-3.5 transition-colors duration-300 ${open === i ? "text-white" : "text-[#417BC1]"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>

          {/* Answer */}
          <div className={`transition-all duration-300 ease-in-out ${open === i ? "max-h-64 pb-5" : "max-h-0"}`}>
            <div className="px-6 flex gap-4">
              <div className="w-7 shrink-0" /> {/* spacer aligns with question text */}
              <p className="text-[#4b5563] leading-relaxed text-sm lg:text-base pr-4">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
