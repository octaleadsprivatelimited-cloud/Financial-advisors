/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d3a35', // Premium Deep Forest Teal
          light: '#1e544f',
          dark: '#072421',
        },
        secondary: {
          DEFAULT: '#c5a880', // Elegant Muted Gold / Champagne
          light: '#d4bd9c',
          dark: '#a6875d',
        },
        accent: '#b8966c',
        dark: '#0f1816', // Dark rich green-black
        cream: '#faf8f5', // Warm luxury background color
        charcoal: '#333e3c',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}


