/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: (theme) => ({
        'light-gray': '#fafaf9',
    }),
    extend: {
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
