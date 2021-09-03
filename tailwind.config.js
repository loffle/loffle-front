module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#4481A0", //청록
      red: "#D0172D",
      gray: {
        darkest: "#515151", //body글씨
        dark: "#3c4858",
        DEFAULT: "#A6A6A6", //자게-본문
        light: "#bbbbbb", //
        lightest: "#f2f2f2", //body백그라운드
      },
      white: "#FFF",
    },
    maxWidth: {
      480: "480px",
    },
    fontFamily: {
      body: ["Roboto"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
