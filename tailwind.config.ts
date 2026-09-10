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
        cream: {
          DEFAULT: "#F7F3ED",
          soft: "#FFF9F2",
        },
        charcoal: {
          DEFAULT: "#302A27",
          600: "#4A4038",
          400: "#8A7E72",
        },
        espresso: {
          DEFAULT: "#29221F",
          700: "#3D332E",
          950: "#15100D",
        },
        gold: {
          DEFAULT: "#C4A46A",
          600: "#AE8D53",
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
