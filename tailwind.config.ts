import type { Config } from "tailwindcss";

// Palette derived from the Al-Falah logo: the deep green of the dome,
// the leaf green of the open book, with warm ivory and a restrained gold.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#F1F5EE",
          100: "#DCE6D4",
          200: "#B9CCAA",
          300: "#8FAB7B",
          600: "#46683A",
          700: "#34502A",
          800: "#293C1C",
          900: "#1F2F15",
          950: "#15200E",
        },
        leaf: {
          100: "#E8F4DF",
          200: "#CFE8BE",
          400: "#8FCB6E",
          500: "#72BC4D",
          600: "#5E9E3E",
        },
        ivory: {
          50: "#FDFBF5",
          100: "#F8F4E9",
          200: "#EFE8D6",
          300: "#E2D8BF",
        },
        gold: {
          300: "#E3CB8F",
          500: "#B8913A",
          700: "#7A5C1C",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72rem" },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};

export default config;
