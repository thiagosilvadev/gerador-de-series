const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      "dark-blue": "#071e3d",
      "light-purple": "#3342d6",
      red: colors.red,
    },

    fontFamily: {
      body: ["Inter", "sans-serif"],
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
