/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeout: {
          "0%": { opacity: "100%", transform: "translateY(0px)" },
          "100%": { opacity: "0%", transform: "translateY(-400px)" },
        },
        fadein: {
          "0%": { opacity: "0%", transform: "translateY(-400px)" },
          "100%": { opacity: "100%", transform: "translateY(0px)" },
        },
      },
      animation: {
        "fade-out": "fadeout 500ms linear",
        "fade-in": "fadein 500ms linear",
      },
      colors: {
        "palette-light": "#f0e3ca",
        "palette-orange": "#ff8303",
        "palette-dark": "#a35709",
        "palette-black": "#1b1a17",
      },
    },
  },
  plugins: [],
};
