import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        ink: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
        },
        brand: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          fg: "var(--primary-fg)",
          50: "#EEF7F1",
          100: "#D7EBDE",
          200: "#B0D6BF",
          300: "#7FB99B",
          400: "#3E8E66",
          500: "#17704C",
          600: "#0B513E",
          700: "#09402F",
        },
        navy: {
          DEFAULT: "#0B2B33",
        },
        line: "var(--border)",
        accent: "var(--accent)",
        lime: {
          DEFAULT: "#B8F44A",
          hover: "#D0FF76",
          dark: "#96CE30",
        },
        tealAccent: "var(--teal)",
        alert: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Manrope", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        card: "16px",
        control: "12px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(19, 45, 40, 0.05), 0 1px 2px -1px rgba(19, 45, 40, 0.03)",
        cardHover: "0 10px 25px -5px rgba(19, 45, 40, 0.08), 0 8px 10px -6px rgba(19, 45, 40, 0.04)",
        glowLime: "0 0 24px -2px rgba(184, 244, 74, 0.35)",
        glowTeal: "0 0 24px -2px rgba(72, 218, 192, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
