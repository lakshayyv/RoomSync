/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        accent: "#2285FA",
        dark: "#171721",
      },
      colors: {
        accent: "#2285FA",
      },
    },
  },
  plugins: [],
};