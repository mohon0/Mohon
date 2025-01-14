/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-midnight":
          "linear-gradient(360deg, transparent, hsl(var(--primary)))",
      },
      boxShadow: {
        cyanshadow:
          "0 0 5px hsl(var(--primary)), 0 0 25px hsl(var(--primary)), 0 0 50px hsl(var(--primary)), 0 0 200px hsl(var(--primary))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },

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

        move: {
          "0%, 100%": {
            left: "0%",
          },
          "50%": {
            left: "calc(100% - 150px)",
          },
        },

        ani: {
          "0%, 40%, 100%": {
            transform: "scale(0.2)",
          },
          "20%": {
            transform: "scale(0.6)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spin: "spin 2s linear infinite",
        animate1: "animate1 1s linear infinite",
        animate2: "animate2 1s linear infinite 0.25s",
        animate3: "animate3 1s linear infinite 0.5s",
        animate4: "animate4 1s linear infinite 0.75s",
        mouse: "mouse 2s infinite",
        scroll: "scroll forwards 80s linear infinite",
        move: "move 4s linear infinite",
        ani: "ani 1.6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
