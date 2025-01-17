import type { Config } from "tailwindcss";
// eslint-disable-next-line import/no-extraneous-dependencies
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xmd: "900px",
      },
      fontFamily: {
        sans: ["var(--font-netflix-sans)", ...fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray109: "rgb(var(--color-gray-109) / <alpha-value>)",
        gray129: "var(--color-gray-129)",
        gray179: "var(--color-gray-179)",
        gray229: "var(--color-gray-229)",
      },
    },
  },
  plugins: [],
};

export default config;
