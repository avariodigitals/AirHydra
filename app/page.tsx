import NewHero from "@/components/NewHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import FaqAccordion from "@/components/FaqAccordion";
import StickyCTA from "@/components/StickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ProductGallery from "@/components/ProductGallery";
import CurrentYear from "@/components/CurrentYear";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = getContent();

  if (!content) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-[#2E6EBB]" suppressHydrationWarning>

      {/* ── JSON-LD Structured Data ───────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "AirHydra In-Flight Hydrating Gel",
            "description": "Premium in-flight hydrating gel designed to keep your skin fresh, dewy and radiant at altitude. Dermatologist-safe and TSA cabin-friendly.",
            "brand": { "@type": "Brand", "name": "AirHydra" },
            "image": "https://ik.imagekit.io/360t0n1jd9/airhydra/product/IMG_7789-removebg-preview_AnXmZSqx1.png",
            "url": "https://airhydra.com",
            "category": "Skincare / Travel Beauty",
            "audience": { "@type": "Audience", "audienceType": "Frequent Flyers, Travellers" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": String(content.testimonials.testimonialsList.length),
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": content.testimonials.testimonialsList.map((r: any) => ({
              "@type": "Review",
              "author": { "@type": "Person", "name": r.name },
              "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": "5" },
              "reviewBody": r.text,
            })),
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "NGN",
              "seller": { "@type": "Organization", "name": "AirHydra" },
              "url": "https://airhydra.com",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AirHydra",
            "url": "https://airhydra.com",
            "logo": "https://ik.imagekit.io/360t0n1jd9/airhydra/Airhydra%20DP%20Logo%20White.png",
            "description": "AirHydra makes premium in-flight skincare for frequent travellers.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+2347072387362",
              "contactType": "customer service",
              "availableLanguage": "English",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": content.faqs.faqList.map((faq: any) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
            })),
          },
        ]) }}
      />

      <NewHero content={content} />

      {/* ── PRODUCT GALLERY ──────────────────────────────────────── */}
      <ProductGallery gallery={content.productGallery} />

      {/* ── PROBLEM ──────────────────────────────────────────────── */}
      <ProblemSection problem={content.problem} />

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <BenefitsSection benefits={content.benefits} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-cream-light">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-tight text-[#1a1a1a]">
              Three Steps to{" "}
              <span className="text-[#417BC1]">Radiant Skin</span>
            </h2>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-8 max-w-4xl mx-auto relative">
            <div className="hidden lg:block absolute top-9 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-primary/15" />

            {[
              <svg key={0} className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
              <svg key={1} className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              <svg key={2} className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
            ].map((icon, i) => (
              <div key={i} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center relative">
                {i < 2 && (
                  <div className="lg:hidden absolute left-[18px] top-[44px] w-px h-[calc(100%+2rem)] bg-primary/15" />
                )}
                <div className="w-9 h-9 lg:w-16 lg:h-16 rounded-full border border-primary/20 bg-white flex items-center justify-center shrink-0 relative z-10 lg:mb-6 shadow-card">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary/60 mb-1 lg:mb-2">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg lg:text-xl font-serif mb-1 lg:mb-3 text-[#1a1a1a]">{content.howItWorks.steps[i]?.title}</h3>
                  <p className="text-[#4b5563] leading-relaxed text-sm">{content.howItWorks.steps[i]?.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE ────────────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-5xl mx-auto">

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#2E6EBB]/10">
                <img src={content.lifestyle.image} alt="AirHydra Lifestyle" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="order-2 lg:order-1">
              <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">Luxury Essential</p>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif mb-4 lg:mb-6 tracking-tight text-[#1a1a1a]">
                {content.lifestyle.headline}
              </h2>
              <p className="text-sm lg:text-base text-[#4b5563] mb-6 lg:mb-8 leading-relaxed">
                {content.lifestyle.description}
              </p>
              <WhatsAppButton
                text={content.lifestyle.ctaText}
                prefillMessage={content.lifestyle.ctaPrefill}
                className="w-full sm:w-auto"
                trackingId="lifestyle"
                whatsappNumber={content.settings.whatsappNumber}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">What Travellers Say</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-tight text-[#1a1a1a]">
              {content.testimonials.headline}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-5xl mx-auto">
            {content.testimonials.testimonialsList.map((review: any, i: number) => (
              <div key={i} className="relative bg-white border border-[#2E6EBB]/10 rounded-2xl p-5 lg:p-6 flex flex-col shadow-card">
                <div className="absolute top-4 right-5 text-4xl font-serif text-primary/10 leading-none select-none">&ldquo;</div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#4b5563] leading-relaxed text-sm flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-[#2E6EBB]/10">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-semibold">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-[#1a1a1a] text-sm font-medium">{review.name}</p>
                    <p className="text-[#9ca3af] text-xs">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORE PICKUP ─────────────────────────────────────────── */}
      <section id="stores" className="py-14 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">Store Pickup</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-tight text-[#1a1a1a]">
              {content.stores.headline}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-5xl mx-auto">
            {content.stores.storesList.map((store: any, i: number) => (
              <div key={i} className="bg-cream-light p-5 lg:p-6 rounded-2xl flex flex-col gap-2.5 border border-[#2E6EBB]/10 shadow-card">
                {store.availability && (
                  <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${
                    store.availability === "In Stock" ? "bg-green-50 text-green-600"
                    : store.availability === "Low Stock" ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-500"
                  }`}>
                    {store.availability}
                  </span>
                )}
                <h3 className="text-base font-serif text-[#1a1a1a]">{store.name}</h3>
                <p className="text-[#4b5563] text-xs leading-relaxed">{store.address}</p>
                <p className="text-primary font-medium text-xs">{store.city}</p>
                {store.pickupInstructions && (
                  <p className="text-[#9ca3af] text-xs leading-relaxed border-t border-[#2E6EBB]/10 pt-2.5">{store.pickupInstructions}</p>
                )}
                <div className="flex flex-col gap-2 mt-auto pt-1">
                  <WhatsAppButton
                    text="WhatsApp Store"
                    prefillMessage={`Hi AirHydra, I'd like to pick up from ${store.name} — ${store.city}`}
                    variant="secondary"
                    className="w-full"
                    trackingId={`store_${i}`}
                    whatsappNumber={content.settings.whatsappNumber}
                  />
                  {store.mapsLink && (
                    <a href={store.mapsLink} target="_blank" rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-[#2E6EBB]/70 hover:text-[#2E6EBB] transition-colors py-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-cream-light">
        <div className="container mx-auto px-4 lg:px-6 max-w-2xl">
          <div className="text-center mb-10 lg:mb-14">
            <span className="inline-block bg-[#2E6EBB]/10 text-[#2E6EBB] font-semibold tracking-[0.2em] uppercase text-xs px-3 py-1 rounded-full mb-4">FAQ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-tight text-[#1a1a1a]">
              Everything You Need{" "}
              <span className="text-[#417BC1]">to Know</span>
            </h2>
          </div>
          <FaqAccordion items={content.faqs.faqList} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-6 relative z-10">

          {/* Logo */}
          <span style={{ fontFamily: "var(--font-roboto)", fontWeight: 900, letterSpacing: "0.06em" }} className="block text-white text-3xl sm:text-4xl lg:text-5xl select-none mb-10">
            AIRHYDRA
          </span>

          {/* CTA content */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif mb-4 lg:mb-6 tracking-tight text-white">
              {content.finalCta.headline}
            </h2>
            <p className="text-sm lg:text-lg text-white/70 mb-8 lg:mb-10 max-w-xl mx-auto leading-relaxed">
              {content.finalCta.description}
            </p>
            <WhatsAppButton
              text={content.finalCta.ctaText}
              prefillMessage={content.finalCta.ctaPrefill}
              variant="secondary"
              className="w-full sm:w-auto"
              trackingId="final_cta"
              whatsappNumber={content.settings.whatsappNumber}
            />
          </div>

          {/* Footer bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/40 text-xs tracking-wide">
              &copy; <CurrentYear /> AirHydra. All rights reserved.
            </p>
            <p className="text-white/30 text-xs tracking-wide">
              Website designed &amp; developed by{" "}
              <a href="https://www.avariodigitals.com" target="_blank" rel="noopener noreferrer" className="text-white/60 font-medium hover:text-white transition-colors duration-200">Avario Digitals</a>
            </p>
          </div>

        </div>
      </section>

      <div className="h-20 md:hidden" />

      <StickyCTA />
      <ExitIntentPopup whatsappNumber={content.settings.whatsappNumber} />
    </main>
  );
}
