"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "%", label: "Average Cabin Humidity" },
{ value: 25, suffix: "%", label: "Moisture lost during long flight" },
  { value: 3, suffix: "hrs", label: "Skin Begins To Feel Tight" },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 50;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) { setCount(value); clearInterval(timer); }
            else { setCount(Math.floor(current)); }
          }, duration / steps);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-8 px-4">
      <p className="text-5xl lg:text-6xl font-sans font-semibold text-white tabular-nums leading-none mb-2">
        {count}{suffix}
      </p>
      <p className="text-xs text-white/70 tracking-widest uppercase text-center font-sans">{label}</p>
    </div>
  );
}

const icons = [
  /* Cracked/dry skin — a face with dry lines */
  <svg key={0} className="w-6 h-6 text-[#2E6EBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14s.5 1.5 2 2m4-2s-.5 1.5-2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9.5h.01M15 9.5h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 7l.5 2M14 7l-.5 2" />
  </svg>,
  /* Puffiness — face with swollen/tired eyes */
  <svg key={1} className="w-6 h-6 text-[#2E6EBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10c0 0 .8-1 2-1s2 1 2 1M12 10c0 0 .8-1 2-1s2 1 2 1" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 15h8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12.5c1 .8 2 .5 2 .5M15 12.5c-1 .8-2 .5-2 .5" />
  </svg>,
];

export default function ProblemSection({ problem }: { problem: any }) {
  return (
    <section className="py-14 lg:py-24 relative overflow-hidden bg-cream">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#2E6EBB 1px, transparent 1px), linear-gradient(90deg, #2E6EBB 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#2E6EBB]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-5 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block bg-[#2E6EBB]/10 text-[#2E6EBB] font-semibold tracking-[0.2em] uppercase text-xs px-3 py-1 rounded-full mb-4">THE FLIGHT EFFECT </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif mb-4 tracking-tight text-[#1a1a1a]">
              {problem.headline}
            </h2>
            <p className="text-sm lg:text-base text-[#4b5563] max-w-2xl mx-auto leading-relaxed">
              {problem.description}
            </p>
          </div>

          {/* Problem cards */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {problem.problemPoints.map((point: any, i: number) => (
              <div key={i} className="relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden border border-[#2E6EBB]/15 shadow-card">
                {/* Image — shown when uploaded */}
                {point.image ? (
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img src={point.image} alt={point.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-[#2E6EBB]/5 flex items-center justify-center">
                    {icons[i]}
                  </div>
                )}
                <div className="relative p-7 lg:p-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#417BC1]" />
                  <h3 className="text-xl lg:text-2xl font-serif mb-3 text-[#1a1a1a]">{point.title}</h3>
                  <p className="text-[#4b5563] leading-relaxed text-sm lg:text-base">{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="grid gap-0 lg:grid-cols-3 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/15 bg-[#3875BE] shadow-blue-glow-sm" style={{boxShadow: "0 0 0 1px rgba(65,123,193,0.3), 0 8px 32px rgba(46,110,187,0.25)"}}>
            {stats.map((s, i) => (
              <div key={i} className={`${i > 0 ? "border-t lg:border-t-0 lg:border-l border-white/15" : ""}`}>
                <StatCounter {...s} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
