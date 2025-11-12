/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26A699',
        secondary: '#167369',
        lightBg: '#F2F2F2',
        darkBg: '#0E3C53',
        textLight: '#1E1E1E',
        textDark: '#EAEAEA',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['Poppins', 'System'],
        body: ['Inter', 'System'],
      },
    },
  },
  plugins: [],
};

