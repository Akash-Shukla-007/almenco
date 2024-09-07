/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this to match your file paths
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Primary blue shade
        secondary: '#3B82F6', // Secondary blue shade
        accent: '#60A5FA', // Accent blue shade
        background: '#F3F4F6', // Background color
        card: '#FFFFFF', // Card background color

      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Customize your font family
      },
      spacing: {
        '128': '32rem', // Customize your spacing as needed
      },
    },
  },
  plugins: [],
};
