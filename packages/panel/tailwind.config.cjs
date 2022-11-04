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
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
