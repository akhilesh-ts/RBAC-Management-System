const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
    colors:{
      primary:"#8d80d1",
      secondary:"#f2ebf9",
      dim:'#c4b5fd'
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}