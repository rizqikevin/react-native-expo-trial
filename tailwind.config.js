/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#09637E",
        secondary: "#088395",
        third: "#7AB2B2",
        background: "#EBF4F6",
      },
      fontFamily: {
        CookieRegular: ["CookieRegular"],
        RobotoRegular: ["RobotoRegular"],
        RobotoBold: ["RobotoBold"],
      },
    },
  },
  plugins: [],
};
