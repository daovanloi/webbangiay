/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scale_pop: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(2)" },
        },
        opacity_pop: {
          "0%": { transform: "opacity: 0" },
          "100%": { transform: "opacity: 1" },
        },
      },
      animation: {
        run_pop: "animation-scale 1s ease-in-out, scale 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
