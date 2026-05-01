"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setVisible(true);
      }
    };

    // Mobile: show after 60s of inactivity
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 60000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-[fadeUp_0.35s_ease-out_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-14 h-14 bg-[#2E6EBB]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#2E6EBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 7 5 11.5 5 14.5a7 7 0 0014 0C19 11.5 16 7 12 2z" />
          </svg>
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2E6EBB] mb-3">Wait — Don't Leave Yet</p>
        <h2 className="text-2xl lg:text-3xl font-serif text-[#0c1e3c] mb-3 leading-tight">
          Get Launch Pricing Before It Ends
        </h2>
        <p className="text-[#2E6EBB]/70 text-sm leading-relaxed mb-7">
          First batch pricing closes soon. Order AirHydra now and land glowing on every flight.
        </p>

        <WhatsAppButton
          text="Order on WhatsApp Now"
          prefillMessage="Hi AirHydra, I want to order before the launch pricing ends"
          className="w-full py-4 text-base font-semibold"
          trackingId="exit_intent"
        />

        <button
          onClick={dismiss}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          No thanks, I'll pay full price later
        </button>
      </div>
    </div>
  );
}
