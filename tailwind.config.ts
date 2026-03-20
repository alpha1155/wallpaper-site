import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 原神主题色
        genshin: {
          gold: "#D4A853",
          "gold-light": "#E8C878",
          "gold-dark": "#B8923F",
        },
        // 元素色
        element: {
          pyro: "#EF7938",
          hydro: "#4CC2F1",
          anemo: "#74C2A8",
          electro: "#AF8EC1",
          dendro: "#A5C83B",
          cryo: "#9FD6E3",
          geo: "#F0B232",
        },
        // 深色主题
        primary: {
          50: "#FDF8E8",
          100: "#F9EFC9",
          200: "#F2DE94",
          300: "#E8C878",
          400: "#D4A853",
          500: "#C49A3D",
          600: "#B8923F",
          700: "#9A7A35",
          800: "#7D632B",
          900: "#604C21",
          950: "#3D3014",
        },
        surface: {
          50: "#F5F5F7",
          100: "#E8E8EC",
          200: "#D1D1D9",
          300: "#A8A8B3",
          400: "#71717A",
          500: "#52525B",
          600: "#3F3F46",
          700: "#2D2D35",
          800: "#1F1F28",
          900: "#16161D",
          950: "#0D0D12",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        shimmer: "shimmer 2s infinite linear",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 168, 83, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 168, 83, 0.6)" },
        },
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        "genshin-gradient": "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
        "genshin-card": "linear-gradient(180deg, rgba(212,168,83,0.1) 0%, rgba(212,168,83,0) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
