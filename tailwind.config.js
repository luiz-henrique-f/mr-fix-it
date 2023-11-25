/* @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "search-background": "url(/world-map.png)",
        "search-background-dark": "url(/world-map-dark.png)",
      },
      colors: {
        primary: "#590BD8",
        primaryLighter: "#9055dd",
        primaryDarker: "#312A4F",
        secondary: "#ff426f",
        secondaryLighter: "#f79eb3",
        secondaryDarker: "#9c1535",

        grayPrimary: "#717171",
        grayLighter: "#BBBEBF",

        walterWhite: "#F5F5F5",

        darkBG: "#0f0f0f",
        whiteBG: "#e5e5e5",
        darkBGLighter: "#202020",
        whiteBGDarker: "#c3c3c3",
      },
      textColor: {
        dark: "#717171",
      },
      screens: {
        sm: "470px",
        "2sm": "640px",
        "2md": "960px",
        "2xl": "1440px",
        "3xl": "1536px",
        "4xl": "1980px",
      },
      boxShadow: {
        "custom-fade":
          "rgba(24, 18, 62, 0.4) 0rem -0.3125rem, rgba(24, 18, 62, 0.3) 0rem -0.625rem, rgba(24, 18, 62, 0.2) 0rem -0.9375rem, rgba(24, 18, 62, 0.1) 0rem -1.25rem, rgba(24, 18, 62, 0.05) 0rem -1.5625rem;",
      },
    },
  },
  plugins: [],
};
