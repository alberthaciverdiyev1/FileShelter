/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ["./**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

