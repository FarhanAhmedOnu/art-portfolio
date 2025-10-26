/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#0d0d0d",
        cardDark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
