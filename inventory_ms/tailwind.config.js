/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: {
            light: '#6ee7b7',
            DEFAULT: '#34d399',
            dark: '#059669',
          },
          secondary: {
            light: '#93c5fd',
            DEFAULT: '#3b82f6',
            dark: '#1d4ed8',
          },
          htiScout: '#fef08a',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
  },
  plugins: [],
};

