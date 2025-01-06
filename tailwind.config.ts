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
      fontFamily: {
        sans: ["netflix-sans", ...fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        normal: "var(--color-normal)",
        active: "var(--color-active)",
      },
    },
  },
  plugins: [],
};

export default config;
