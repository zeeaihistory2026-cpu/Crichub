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
        display: ["var(--font-display)", "Manrope", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // PRD Section 03 Typography Scale
        "hero-display": ["3.5rem", { lineHeight: "4rem", letterSpacing: "-0.035em", fontWeight: "800" }], // 56px / 64px
        "hero-display-mobile": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.03em", fontWeight: "800" }], // 36px / 44px
        "page-h1": ["2.75rem", { lineHeight: "3.25rem", letterSpacing: "-0.025em", fontWeight: "800" }], // 44px / 52px
        "page-h1-mobile": ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em", fontWeight: "800" }], // 32px / 40px
        h1: ["3.5rem", { lineHeight: "4rem", letterSpacing: "-0.035em", fontWeight: "800" }],
        "h1-mobile": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.03em", fontWeight: "800" }],
        h2: ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em", fontWeight: "700" }], // 32px / 40px
        "h2-mobile": ["1.625rem", { lineHeight: "2.125rem", letterSpacing: "-0.02em", fontWeight: "700" }], // 26px / 34px
        h3: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.015em", fontWeight: "700" }], // 24px / 32px
        "h3-mobile": ["1.375rem", { lineHeight: "1.875rem", letterSpacing: "-0.015em", fontWeight: "700" }], // 22px / 30px
        "card-heading": ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em", fontWeight: "700" }], // 20px / 28px
        "card-heading-mobile": ["1.125rem", { lineHeight: "1.625rem", letterSpacing: "-0.01em", fontWeight: "700" }], // 18px / 26px
        "body-lg": ["1.125rem", { lineHeight: "1.8125rem", letterSpacing: "-0.01em", fontWeight: "400" }], // 18px / 29px
        "body-default": ["1rem", { lineHeight: "1.625rem", letterSpacing: "0em", fontWeight: "400" }], // 16px / 26px
        body: ["1rem", { lineHeight: "1.625rem", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", letterSpacing: "0em", fontWeight: "450" }], // 14px / 22px
        small: ["0.875rem", { lineHeight: "1.375rem", letterSpacing: "0em", fontWeight: "450" }],
        eyebrow: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.05em", fontWeight: "600" }], // 12px / 18px
        caption: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.04em", fontWeight: "500" }],
        badge: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.05em", fontWeight: "600" }], // 11px / 16px
        "btn-nav": ["0.9375rem", { lineHeight: "1.375rem", letterSpacing: "-0.01em", fontWeight: "650" }], // 15px / 22px
        "score-major": ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em", fontWeight: "750" }], // 32px / 40px
        "big-calc": ["2.5rem", { lineHeight: "3rem", letterSpacing: "-0.03em", fontWeight: "800" }], // 40px / 48px
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
        tight: "-0.015em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
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