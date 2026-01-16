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
        "offset-wine": "5px 5px 0px 0px #7B1F59",
        "offset-teal": "5px 5px 0px 0px #46ABB7",
        "offset-rose": "5px 5px 0px 0px #D77A8D",
        "glow-wine": "0 0 20px rgba(123, 31, 89, 0.3)",
        "glow-teal": "0 0 20px rgba(70, 171, 183, 0.3)"
      },
      fontFamily: {
        "plusjakartasans-bold": ["var(--font-plusjakartasans-bold)"],
        "plusjakartasans-semibold": ["var(--font-plusjakartasans-semibold)"],
        "plusjakartasans-light": ["var(--font-plusjakartasans-light)"],
        "plusjakartasans-regular": ["var(--font-plusjakartasans-regular)"],
        "plusjakartasans-medium": ["var(--font-plusjakartasans-medium)"],
        auromiya: ["var(--font-auromiya)"]
      },
      animation: {
        "spin-slow": "spinSlow 12s linear infinite",
        "spin-slow-reverse": "spinSlowReverse 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        swim: "swim 12s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        spinSlow: {
          from: {transform: "rotate(0deg)"},
          to: {transform: "rotate(360deg)"}
        },
        spinSlowReverse: {
          from: {transform: "rotate(360deg)"},
          to: {transform: "rotate(0deg)"}
        },
        float: {
          "0%, 100%": {transform: "translateY(0px)"},
          "50%": {transform: "translateY(-20px)"}
        },
        floatSlow: {
          "0%, 100%": {transform: "translateY(0px) rotate(0deg)"},
          "50%": {transform: "translateY(-30px) rotate(5deg)"}
        },
        swim: {
          "0%, 100%": {transform: "translateX(0) translateY(0)"},
          "25%": {transform: "translateX(20px) translateY(-10px)"},
          "50%": {transform: "translateX(40px) translateY(0)"},
          "75%": {transform: "translateX(20px) translateY(10px)"}
        }
      }
    }
  },
  plugins: []
};
