const plugin = require("tailwindcss/plugin");
const {extendedColor} = require("./src/utils/helpers/extendedColors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: extendedColor,
      screens: {
        xs: "560px",
        xxs: "440px"
      },
      boxShadow: {
        "offset-purple": "5px 5px 0px 0px #7147C4",
        "offset-yellow-blue": "5px 5px 0px 0px #FFE32C, -5px -5px 0px 0px #3578FF",
        "offset-blue": "10px 10px 0px 0px #0C5DFF"
      },
      fontFamily: {
        "plusjakartasans-bold": ["var(--font-plusjakartasans-bold)"],
        "plusjakartasans-semibold": ["var(--font-plusjakartasans-semibold)"],
        "plusjakartasans-light": ["var(--font-plusjakartasans-light)"],
        "plusjakartasans-regular": ["var(--font-plusjakartasans-regular)"],
        "plusjakartasans-medium": ["var(--font-plusjakartasans-medium)"],
        auromiya: ["var(--font-auromiya)"]
      }
    }
  },
  plugins: []
};
