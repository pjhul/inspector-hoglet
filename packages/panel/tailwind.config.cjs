/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light-gray': '#fafaf9',
      },
      fontFamily: {
        code: ['Source Code Pro', 'Menlo', 'Consolas', 'monaco', 'monospace'],
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
