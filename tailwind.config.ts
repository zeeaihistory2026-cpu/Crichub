import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554",
          950: "#091224",
        },
        navy: {
          DEFAULT: "#0b1528",
          deep: "#070e1c",
          surface: "#0f1d38",
          border: "#1c2e50",
          light: "#24375d",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          subtle: "#f1f5f9",
          page: "#f8fafc",
        },
        ink: {
          DEFAULT: "#0f172a",
          primary: "#0b132b",
          secondary: "#334155",
          muted: "#64748b",
          light: "#94a3b8",
        },
        coral: {
          DEFAULT: "#f97316",
          light: "#ffedd5",
          hover: "#ea580c",
        },
        cricketGreen: {
          DEFAULT: "#10b981",
          light: "#ecfdf5",
          dark: "#047857",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        card: "18px",
        control: "10px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        cardHover:
          "0 12px 28px -6px rgba(15, 23, 42, 0.09), 0 8px 12px -4px rgba(15, 23, 42, 0.03)",
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
        glow: "0 0 20px -2px rgba(37, 99, 235, 0.25)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        tight: "-0.015em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
