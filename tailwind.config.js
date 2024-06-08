/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#FFF9D0',
        'custome-blue': '#CAF4FF',
      },
      animation: {
        "spin-slow": "bounce 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
