import WhatsAppButton from "./WhatsAppButton";

interface NewHeroProps {
  content: {
    hero: {
      headline: string;
      subheadline: string;
      primaryCtaText: string;
      primaryCtaPrefill: string;
      secondaryCtaText?: string;
      heroImage?: string;
      productImage?: string;
      overlayOpacity?: number;
      trustBadges?: string[];
    };
    settings?: {
      urgencyText?: string;
      marqueeText?: string;
      whatsappNumber?: string;
    };
  };
}

const defaultTrustBadges = [
  "TSA Cabin Friendly",
  "Dermatologist Safe",
  "Premium Travel Formula",
  "Fast Nationwide Delivery",
];

export default function NewHero({ content }: NewHeroProps) {
  const { hero, settings } = content;
  const overlay = hero.overlayOpacity ?? 0.52;
  const badges = hero.trustBadges?.length ? hero.trustBadges : defaultTrustBadges;
  const marquee = settings?.marqueeText ?? "First batch now available.  ·  Order yours today.";

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0c1e3c]">
      {/* Background image */}
      {hero.heroImage && (
        <img
          src={hero.heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(12,30,60,${overlay + 0.1}) 0%, rgba(12,30,60,${overlay}) 60%, rgba(46,110,187,${overlay - 0.15}) 100%)`,
        }}
      />

      {/* Logo + Urgency banner row */}
      <div className="relative z-10 flex items-center justify-between px-5 lg:px-10 py-4 border-b border-white/10">
        <span style={{ fontFamily: "var(--font-roboto)", fontWeight: 700, letterSpacing: "0.1em" }} className="text-white text-lg lg:text-xl select-none shrink-0">
          AIRHYDRA
        </span>
        <div className="flex-1 overflow-hidden ml-8">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .marquee-text { animation: marquee 18s linear infinite; display: inline-block; white-space: nowrap; }
          `}</style>
          <p className="marquee-text text-white/70 text-xs font-medium tracking-[0.18em] uppercase">
            {marquee}&nbsp;&nbsp;·&nbsp;&nbsp;{marquee}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-5 lg:px-12 py-16 lg:py-24">
          <div className="gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

            {/* Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight mb-6">
                {hero.headline.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < hero.headline.split('\n').length - 1 && <br className="hidden lg:inline" />}
                  </span>
                ))}
              </h1>

              <p className="text-base lg:text-xl text-white/75 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {hero.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <WhatsAppButton
                  text={hero.primaryCtaText}
                  prefillMessage={hero.primaryCtaPrefill}
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold tracking-wide shadow-[0_20px_50px_rgba(46,110,187,0.4)]"
                  trackingId="hero_primary"
                  whatsappNumber={settings?.whatsappNumber}
                />
                {hero.secondaryCtaText && (
                  <a
                    href="#stores"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hero.secondaryCtaText}
                  </a>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-col gap-2.5 items-center lg:items-start">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4ade80" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-white/90 font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
