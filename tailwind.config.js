/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "primary-hover": "#333333",
        "background-light": "#FFFFFF",
        "background-dark": "#121212",
        "surface-light": "#F3F4F6",
        "surface-dark": "#1E1E1E",
        "text-light": "#1F2937",
        "text-dark": "#F3F4F6",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
