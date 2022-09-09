/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      black100: "#111111",
      white: "#FFFFFF",
      gray: "#888888",
      gray100: "#333",
      transparent: "transparent",
      blue: "#12A2E9",
      pink: "#D946EF",
    },
    textColor: {
      white: "#FFFFFF",
      normal: "#FFFFFF",
      weak: "#888888",
      transparent: "transparent",
      blue: "#12A2E9",
      pink: "#D946EF",
      black: "#000000",
      red: "#CD5C5C",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        frame: 'url("/frame-bg.jpg")',
        gradient: "linear-gradient(to right, #12A2E9, #D946EF)",
      },
      boxShadow: {
        normal: "0 0 0 1px #333",
        box: "2px 8px 15px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
