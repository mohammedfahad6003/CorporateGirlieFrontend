module.exports = {
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
        cursive: ["cursive"], // generic cursive fallback
        dancing: ["Dancing Script", "cursive"],
        satisfy: ["Satisfy", "cursive"],
        sacramento: ["Sacramento", "cursive"],
      },
    },
  },
  plugins: [],
};
