/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pt-sans": ['"PT Sans"', "sans-serif"], // Custom font family
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      fontStyle: {
        italic: "italic",
        normal: "normal",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
      fontStyle: ["hover", "focus"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"],
  },
};
