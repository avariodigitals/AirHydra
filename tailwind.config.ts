import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E6EBB",
        cream: "#F9F6F2",
        "cream-light": "#FDFBF7",
        "cream-dark": "#F2EDE4",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "blue-glow": "0 0 40px rgba(46, 110, 187, 0.25)",
        "blue-glow-sm": "0 0 20px rgba(46, 110, 187, 0.15)",
        card: "0 4px 24px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

