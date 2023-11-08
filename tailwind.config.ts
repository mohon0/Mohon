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
          100: "#00ffff",
          200: "#09f1b8",
          300: "#00a2ff",
          400: "#ff00d2",
        },
      },
      backgroundImage: {
        "gradient-midnight": "linear-gradient(360deg, transparent, #03e9f4)",
      },
      boxShadow: {
        cyanshadow:
          "0 0 5px #09f1b8, 0 0 25px #09f1b8, 0 0 50px #09f1b8, 0 0 200px #09f1b8",
      },
      keyframes: {
        animate1: {
          "0%": {
            left: "-100%",
          },
          "50%, 100%": {
            left: "100%",
          },
        },
        animate2: {
          "0%": {
            top: "-100%",
          },
          "50%, 100%": {
            top: "100%",
          },
        },
        animate3: {
          "0%": {
            right: "-100%",
          },
          "50%, 100%": {
            right: "100%",
          },
        },
        animate4: {
          "0%": {
            bottom: "-100%",
          },
          "50%, 100%": {
            bottom: "100%",
          },
        },

        mouse: {
          "0%": {
            opacity: "1",
            top: "10px",
          },
          "100%": {
            opacity: "0",
            top: "35px",
          },
        },
      },
      animation: {
        spin: "spin 2s linear infinite",
        animate1: "animate1 1s linear infinite",
        animate2: "animate2 1s linear infinite 0.25s",
        animate3: "animate3 1s linear infinite 0.5s",
        animate4: "animate4 1s linear infinite 0.75s",
        mouse: "mouse 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
