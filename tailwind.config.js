/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'spotify': '#1DB954',
      'black': '#191414',
      'white': '#ffffff',
      'gray': '#c4c2c2',
      'opGray': "#222222",
      'lineGray': "#5c5b5b"
    },
    extend: {
      fontFamily: {
        custom: ['Dosis', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

