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
          "0%": { transform: "scale(1)" },
          "5%": { transform: "scale(0.95)" },
          "10%": { transform: "scale(0.9)" },
          "15%": { transform: "scale(0.85)" },
          "20%": { transform: "scale(0.8)" },
          "25%": { transform: "scale(0.75)" },
          "30%": { transform: "scale(0.7)" },
          "35%": { transform: "scale(0.65)" },
          "40%": { transform: "scale(0.6)" },
          "45%": { transform: "scale(0.55)" },
          "50%": { transform: "scale(0.5)" },
          "55%": { transform: "scale(0.45)" },
          "60%": { transform: "scale(0.4)" },
          "65%": { transform: "scale(0.35)" },
          "70%": { transform: "scale(0.3)" },
          "75%": { transform: "scale(0.25)" },
          "80%": { transform: "scale(0.2)" },
          "85%": { transform: "scale(0.15)" },
          "90%": { transform: "scale(0.1)" },
          "95%": { transform: "scale(0.05)" },
          "100%": { transform: "scale(0)" },
        },
        fadein: {
          "0%": { transform: "scale(0)" },
          "5%": { transform: "scale(0.05)" },
          "10%": { transform: "scale(0.1)" },
          "15%": { transform: "scale(0.15)" },
          "20%": { transform: "scale(0.2)" },
          "25%": { transform: "scale(0.25)" },
          "30%": { transform: "scale(0.3)" },
          "35%": { transform: "scale(0.35)" },
          "40%": { transform: "scale(0.4)" },
          "45%": { transform: "scale(0.45)" },
          "50%": { transform: "scale(0.5)" },
          "55%": { transform: "scale(0.55)" },
          "60%": { transform: "scale(0.6)" },
          "65%": { transform: "scale(0.65)" },
          "70%": { transform: "scale(0.7)" },
          "75%": { transform: "scale(0.75)" },
          "80%": { transform: "scale(0.8)" },
          "85%": { transform: "scale(0.85)" },
          "90%": { transform: "scale(0.9)" },
          "95%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-out": "fadeout 500ms linear",
        "fade-in": "fadein 500ms linear",
      },
      colors: {
        "palette-light": "#f0e3ca",
        "palette-orange": "#ff8303",
        "palette-dark": "#ff8303",
        "palette-black": "#ff8303",
      },
    },
  },
  plugins: [],
};
