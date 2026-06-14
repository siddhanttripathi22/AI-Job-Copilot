/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00e5ff",
        dark: {
          primary: "#070b14",
          card: "#0d1117",
          input: "#0a0f1a",
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 