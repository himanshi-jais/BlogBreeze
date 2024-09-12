/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBeige: "E1D7B7", // Your custom color
        Vanilla: "dfd3c3",
        desertSand: "f4deb3",
        copperRed: "#c5705d",
      },
    },
  },
  plugins: [],
};
