module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#3C4875', //청록
      secondary: {
        DEFAULT: '#6095b0',
        light: '#c3d7e1',
      },
      red: '#D0172D',
      white: '#FFF',
      gray: {
        darkest: '#515151', //body글씨
        dark: '#3c4858',
        DEFAULT: '#A6A6A6', //자게-본문
        light: '#bbbbbb', //
        lightest: '#f2f2f2', //body백그라운드
        border: '#e3e3e3',
        input: '#e5e7eb',
        social: '#737373',
      },
      modal: '#00000080',
    },
    maxWidth: {
      480: '480px',
    },
    fontFamily: {
      body: ['Roboto'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({
      strategy: 'class',
      //https://github.com/tailwindlabs/tailwindcss-forms
    }),
  ],
};
