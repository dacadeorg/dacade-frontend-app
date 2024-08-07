/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const typography = require("@tailwindcss/typography");
const aspectRatio = require("@tailwindcss/aspect-ratio");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5", "gap-0", "gap-1", "gap-2", "gap-3", "gap-y-3", "gap-y-0"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
      },
      colors: {
        current: "currentColor",
        "brand-dark": "#205ED7",
        brand: "#1B66F8",
        orange: "rgba(255, 187, 1, 0.17)",
        "orange-light": "rgba(173, 87, 0, 1)",
        "blue-lighter": "#F8FAFF",
        "blue-light": "#DDE9FF",
        invert: "#FFFFFF",
        theme: {
          primary: "var(--tm-primary)",
          secondary: "var(--tm-secondary)",
          text: "var(--tm-text)",
          highlight: "var(--tm-highlight)",
          accent: "var(--tm-accent)",
          muted: "var(--tm-muted)",
        },
        icon: {
          primary: "#111827",
          disabled: "#D1D5D8",
        },
      },
      textColor: {
        primary: "#271f11",
        secondary: "#4B5563",
        tertiary: "#9CA3AF",
        disabled: "#D1D5D8",
        success: "#16A34A",
        warning: "#7C2D12",
        danger: "#DC2626",
      },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#F9FAFB",
        tertiary: "#F3F4F6",
        highlight: "#F5F9FF",
        success: "#F0FDF4",
        warning: "#FEFCE8",
        danger: "#FEF2F2",
      },
      borderColor: {
        primary: "#E5E7E8",
        secondary: "#D1D5D8",
        success: "#86EFAC",
        warning: "#FEF3C7",
        danger: "#F87171",
        "light-brand": "#DBEAFE",
      },
      spacing: {
        3.75: "0.9375rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        5.75: "1.4375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        10.5: "2.625rem",
        10.75: "2.6875rem",
        13: "3.25rem",
        15: "3.75rem",
        16.25: "4.25rem",
        17: "4.5rem",
        19: "4.75rem",
        44: "11rem",
        62: "15.5rem",
        82: "20.5rem",
        96.5: "25.5rem",
        98: "28rem",
        128: "32rem",
        182.5: "45.625rem",
        "10.5/12": "90%",
        "1/100": "1%",
        "1/10": "10%",
      },
      borderRadius: {
        "3.5xl": "1.75rem",
        "4xl": "2.375rem",
      },
      boxShadow: {
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0px 0px 12px 0px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      fontSize: {
        xxs: ["0.6875rem", { lineHeight: "1.2rem" }],
        ".5xl": ["1.375rem", { lineHeight: "1.75rem" }],
        "3.5xl": ["2rem", { lineHeight: "2rem" }],
        "4.5xl": ["2.5rem", { lineHeight: "2.475rem" }],
        "6.5xl": ["4rem", { lineHeight: "1" }],
        "7.5xl": ["5rem", { lineHeight: "1" }],
        "7.75xl": ["5.75rem", { lineHeight: "5.75rem" }],
      },
      lineHeight: {
        3.3: "0.825rem",
        4.95: "1.2375rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
        11: "2.75rem",
        13.4: "3.3rem",
      },
      letterSpacing: {
        1: "0.01em",
        2: "0.02em",
        3: "0.03em",
        4: "0.04em",
        6: "0.06em",
      },
      maxWidth: {
        "3xs": "5rem",
        "2xs": "10rem",
        ".5xs": "14em",
        ".5xl": "40rem",
        prose: "100%",
        sidebar: "21.25rem",
      },
      maxHeight: {
        "3xs": "5rem",
        "2xs": "10rem",
        ".5xs": "14em",
        xs: "20rem",
        sm: "24rem",
        sidebar: "21.25rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        ".5xl": "40rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "7.1xl": "80.5rem",
        "8xl": "88rem",
        prose: "100%",
      },
      minHeight: {
        "3xs": "5rem",
        "2.5xs": "7.5rem",
        "2xs": "10rem",
        ".5xs": "14em",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      minWidth: (theme) => ({
        ...theme("spacing"),
        "3xs": "5rem",
        "2xs": "10rem",
        ".5xs": "14em",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      }),
      zIndex: {
        99: "99",
        999: "999",
      },
    },
  },
  plugins: [typography, aspectRatio],
};
