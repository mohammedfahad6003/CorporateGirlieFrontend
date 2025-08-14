import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Times New Roman", "Times", "serif"],
        cursive: ["cursive"],
        dancing: ["Dancing Script", "cursive"],
        satisfy: ["Satisfy", "cursive"],
        sacramento: ["Sacramento", "cursive"],
      },
    },
  },
  plugins: [scrollbar],
};

export default config;
