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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#050810",
          900: "#0a0f1c",
          800: "#111a2e",
          700: "#1a2540",
        },
        ice: {
          100: "#eef6fc",
          200: "#d7e9f7",
          300: "#aecdea",
          400: "#84add9",
          500: "#5c8bc2",
        },
        cream: "#FFFBF5",
        charcoal: {
          DEFAULT: "#2B2420",
          600: "#4A4038",
          400: "#8A7E72",
        },
        raspberry: {
          DEFAULT: "#017F8D",
          600: "#015F69",
        },
        mango: {
          DEFAULT: "#FFA94D",
          600: "#F5920F",
        },
        pistachio: {
          DEFAULT: "#9CBF7D",
          600: "#82A863",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
