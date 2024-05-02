/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/*"],
  theme: {
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}

