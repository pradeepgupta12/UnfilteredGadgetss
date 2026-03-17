/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4500',
          light: '#FF6B35',
          dark: '#CC3700',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          card: '#111111',
        },
        accent: {
          gold: '#FFB800',
          green: '#00C853',
        },
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'scroll-left': 'scrollLeft 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
