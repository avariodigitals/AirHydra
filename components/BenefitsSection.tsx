"use client";

import { useEffect, useRef, useState } from "react";

const icons = [
  // Deep Hydration — water drop
  <svg key={0} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 7 5 11.5 5 14.5a7 7 0 0014 0C19 11.5 16 7 12 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.5 3.5 0 01-3.5-3.5" />
  </svg>,
  // Reduces Puffiness — eye
  <svg key={1} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Boosts Radiance — sun
  <svg key={2} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" strokeWidth={1.5} strokeLinecap="round" />
    <path strokeLinecap="round" strokeWidth={1.5} d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>,
  // Travel-Friendly — plane
  <svg key={3} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // All Skin Types — leaf / nature
  <svg key={4} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
  // Fast Absorbing — bolt
  <svg key={5} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
];

function BenefitCard({ title, index }: { title: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group bg-cream-light border border-[#2E6EBB]/10 p-6 lg:p-8 rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-cream hover:border-[#2E6EBB]/20 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, background-color 0.3s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <div className="w-11 h-11 lg:w-13 lg:h-13 bg-[#2E6EBB]/10 rounded-xl flex items-center justify-center mb-5 text-[#2E6EBB] group-hover:bg-[#2E6EBB]/15 transition-colors duration-300">
        {icons[index]}
      </div>
      <h3 className="text-base lg:text-lg font-serif text-[#1a1a1a] leading-snug">{title}</h3>
    </div>
  );
}

export default function BenefitsSection({ benefits }: { benefits: any }) {
  return (
    <section className="py-14 lg:py-24 relative overflow-hidden bg-white">      
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(56,117,190,0.12),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(56,117,190,0.07),transparent_70%)]" />
        <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-[#3875BE]/[0.06] blur-[80px]" />
        <div className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#3875BE]/[0.05] blur-[80px]" />
        <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3875BE]/20 to-transparent" />
        <div className="absolute top-[42%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#3875BE]/10 to-transparent" />
      </div>
      <div className="container mx-auto px-5 lg:px-6">
        <div className="text-center mb-8 lg:mb-14">
          <p className="text-[#2E6EBB] font-semibold tracking-[0.2em] uppercase text-xs mb-3">Why AirHydra</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif mb-3 tracking-tight text-[#1a1a1a]">
            {benefits.headline}
          </h2>
          <p className="text-base text-[#4b5563] max-w-xl mx-auto leading-relaxed">
            {benefits.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-6xl mx-auto">
          {(benefits.benefitsList ?? []).map((benefit: any, i: number) => (
            <BenefitCard key={i} title={benefit.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
