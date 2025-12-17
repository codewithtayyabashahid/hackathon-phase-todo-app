import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#3B82F6",
          purple: "#A855F7",
          red: "#EF4444",
          black: "#0F172A",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #3B82F6, #A855F7, #EF4444)",
        "gradient-dark": "linear-gradient(to bottom right, #0F172A, #7E22CE, #0F172A)",
        "gradient-card": "linear-gradient(to bottom right, rgba(30, 41, 59, 0.5), rgba(126, 34, 206, 0.3), rgba(30, 41, 59, 0.5))",
      },
    },
  },
  plugins: [],
};

export default config;