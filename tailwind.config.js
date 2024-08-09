/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        clashDisplay: ['clashDisplay', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#FB7200',
        },
        light: {
          100: '#FFFFFFB2',
          200: '#FFFFFF99',
          300: '#FFFFFF1A',
          400: '#FFFFFF80',
        },
        gray: {
          100: '#A9A9A9',
          200: '#797979',
          500: '#242331',
        },
      },
      backgroundImage: {
        background: 'url("/images/background.svg")',
      },
    },
  },
  plugins: [],
};
