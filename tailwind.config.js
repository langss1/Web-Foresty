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
          DEFAULT: "#ed1b24", // Foresty Red (muda)
          dark: "#b22930",    // Foresty Red (tua)
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
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(237, 27, 36, 0.5)',
        'red-glow-lg': '0 0 30px rgba(237, 27, 36, 0.7)',
        'red-glow-dark': '0 0 15px rgba(178, 41, 48, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'pulse-red': 'pulse-red 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(237, 27, 36, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(237, 27, 36, 0.6)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'pulse-red': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
