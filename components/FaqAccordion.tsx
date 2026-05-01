"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#2E6EBB]/10 rounded-3xl bg-white shadow-card border border-[#2E6EBB]/8 px-5 lg:px-8">
      {items.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <h3 className={`text-lg lg:text-xl font-serif pr-8 transition-colors duration-200 ${
              open === i ? "text-[#2E6EBB]" : "text-[#2E6EBB]/85 group-hover:text-[#2E6EBB]"
            }`}>
              {faq.question}
            </h3>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              open === i
                ? "bg-[#2E6EBB] rotate-45 shadow-blue-glow-sm"
                : "border border-[#2E6EBB]/15 bg-cream group-hover:border-[#2E6EBB]"
            }`}>
              <svg
                className={`w-3.5 h-3.5 transition-colors duration-300 ${open === i ? "text-white" : "text-[#2E6EBB]/55 group-hover:text-[#2E6EBB]"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
          <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open === i ? "max-h-64 pb-6" : "max-h-0"}`}>
            <p className="text-[#2E6EBB]/70 leading-relaxed text-sm lg:text-base">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

