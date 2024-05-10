/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/*"],
  theme: {
    extend: {
      colors: {
        'ai-blue': '#3CA3EE',
      }
    },
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}

