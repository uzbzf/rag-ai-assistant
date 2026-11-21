import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: "#E11D48",
            50: "#FFF1F2",
            100: "#FFE4E6",
            500: "#F43F5E",
            600: "#E11D48",
            700: "#BE123C",
            800: "#9F1239",
          },
          dark: {
            DEFAULT: "#0F172A",
            light: "#1E293B",
            card: "#182234",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        red: "0 10px 30px -5px rgba(225, 29, 72, 0.3)",
        card: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
        cardHover: "0 20px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(225, 29, 72, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
