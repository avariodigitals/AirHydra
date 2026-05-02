"use client";

const engineeredBadges = [
  "Reduces Puffiness",
  "Travel-Friendly Size",
  "Deep Hydration",
  "Enhances Radiance",
  "Suitable For All Skin Types",
  "Fast Absorbing Formula"
];

export default function Productlay() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#1a5a8a] to-[#2b7ab5] relative overflow-hidden text-white">
      <div className="container mx-auto px-5 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">

          {/* Title and Description */}
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight mb-6">
              Premium Altitude Care
            </h2>
            <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              Engineered specifically for first-class flyers, AirHydra delivers salon-quality hydration that combats the harsh conditions of high-altitude travel. Experience the luxury of radiant, refreshed skin upon arrival.
            </p>
          </div>

          {/* Product Image */}
          <div className="flex justify-center mb-24 lg:mb-32">
            <div className="relative w-full max-w-5xl">
              <div className="absolute inset-0 rounded-3xl bg-white/10 blur-3xl" />
              <img
                src="/images/airhydrapd.png"
                alt="AirHydra Premium Altitude Care"
                className="relative w-full h-auto object-contain z-10"
              />
            </div>
          </div>

          {/* Glass Effect Badges Row */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {engineeredBadges.map((badge, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-xl" />

                {/* Glass morphism circle */}
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center group hover:border-white/50 transition-all duration-300">
                  {/* Inner light accent */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Text */}
                  <p className="relative text-center text-white/95 text-xs lg:text-sm font-medium leading-tight px-3 z-10">
                    {badge}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
