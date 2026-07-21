/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      fontFamily: {
        generalsans: ["General Sans", "sans-serif"],
        primary: ["var(--font-orbitron)", "sans-serif"],
        secondary: "Rajdhani",
        tertiary: "Aldrich",
      },
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#010103",
          200: "#0E0E10",
          300: "#1C1C21",
          500: "#3A3A49",
          600: "#1A1A1A",
        },
        white: {
          DEFAULT: "#FFFFFF",
          800: "#E4E4E6",
          700: "#D6D9E9",
          600: "#AFB0B6",
          500: "#62646C",
        },
        primary: "#0a0a0a",
        accent: "#B809C3",
        accent1: "#38fec3",
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) scale(0.9)' },
          '66%': { transform: 'translate(40px, -20px) scale(1.1)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, 40px) scale(1.2)' },
          '66%': { transform: 'translate(-30px, -30px) scale(0.8)' },
        }
      },
      animation: {
        'float-1': 'float-1 10s ease-in-out infinite',
        'float-2': 'float-2 12s ease-in-out infinite',
        'float-3': 'float-3 11s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
