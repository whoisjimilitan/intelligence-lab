import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        brand: "#0A66C2",
        "brand-dark": "#0851A8",
        navy: "#222222",
        surface: "#F3F6F9",
        muted: "#6b7280",
      },
      spacing: {
        18: "4.5rem",
        20: "5rem",
      },
    },
  },
  plugins: [],
};
export default config;
