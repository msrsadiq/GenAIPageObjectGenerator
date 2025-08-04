/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1E8F8E',
        'brand-dark': '#16283C',
        'brand-neutral': '#AAAAAA'
      }
    }
  },
  plugins: [],
  // ...
}
