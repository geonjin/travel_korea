/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["cookieRegularFont", "Arial", "sans-serif"],
        cookie: ["cookieBlackFont"],
      }
    },
    screens: {
      sm: { min: "400px", max: "815px" },
      md: { min: "816px", max: "1250px" },
      lg: { min: "1251px", max: "2500px" },
    },
  },
  plugins: [],
}
