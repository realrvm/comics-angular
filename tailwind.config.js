/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        yatra: ["yatra", "sans-serif"],
        vinque: ["vinque", "sans-serif"],
      },
      backgroundImage: {
        "bg-desktop": "url('public/images/bg-desktop.png')",
        "bg-mobile": "url('public/images/bg-mobile.png')",
      },
      colors: {
        beige: "#b96504",
        light: "#fef3d9",
      },
    },
  },
  plugins: [],
};
