/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#284C63',
        secondary: '#34607F',
        tertiary: '#f2f0f0'
      }
    },
    fontFamily: {
      geist: ['Geist', 'sans-serif']
    }
  },
  plugins: []
}
