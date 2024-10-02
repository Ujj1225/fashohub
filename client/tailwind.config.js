/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: { custom: ["Assistant"] },
    screens: {
      xxl: { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1105px" },
      md: { max: "867px" },
      sm: { max: "639px" },
      xsm: {max:"450px"}
    },
  },
  plugins: [],
};
