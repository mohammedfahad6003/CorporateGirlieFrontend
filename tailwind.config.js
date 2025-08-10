module.exports = {
  darkMode: 'class',
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
