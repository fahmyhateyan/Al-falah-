import type { Config } from "tailwindcss";

// Palette derived from the Al-Falah logo: the deep green of the dome,
// the light green of the open book, with white and soft green tints.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep green of the logo's dome (800 is the exact logo colour).
        forest: {
          50: "#F0F6EC",
          100: "#DCEBD3",
          200: "#B9D6A9",
          300: "#8DBB78",
          600: "#46683A",
          700: "#34502A",
          800: "#293C1C",
          900: "#1E3418",
          950: "#132611",
        },
        // Light green of the logo's open book.
        leaf: {
          100: "#E8F4DF",
          200: "#CFE8BE",
          400: "#8FCB6E",
          500: "#72BC4D",
          600: "#5E9E3E",
        },
        // Page whites and soft green tints for alternating sections.
        mist: {
          50: "#FFFFFF",
          100: "#F1F8EC",
          200: "#E2F0D8",
          300: "#CDE5BD",
        },
        // Light-green accent for buttons and highlights on dark green.
        sprout: {
          300: "#A9DC88",
          500: "#5FA83C",
          700: "#3D6B27",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Amiri", "Noto Naskh Arabic", "serif"],
      },
      maxWidth: { content: "72rem" },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};

export default config;
