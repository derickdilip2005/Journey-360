/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B7A0B', // Green
          light: '#5CAD41',
          dark: '#1A5D04',
        },
        secondary: {
          DEFAULT: '#D17A22', // Earthy orange
          light: '#F4A259',
          dark: '#A85C10',
        },
        tertiary: {
          DEFAULT: '#8B5E34', // Earthy brown
          light: '#C49A6C',
          dark: '#5F3F21',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}