/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D48", // Foresty Red
          dark: "#9F1239",
        },
        cyber: {
          black: "#0A0A0A",
          dark: "#121212",
          gray: "#1F1F1F",
          red: "#FF0000",
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(225, 29, 72, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(225, 29, 72, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
