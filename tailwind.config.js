/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      keyframes: {
        'reveal-word': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'letter-reveal': {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(0.8)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'logo-bar-1': {
          '0%': { transform: 'translateY(-40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'logo-bar-2': {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'blob-animation': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in': {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
      },
      animation: {
        'reveal-word': 'reveal-word 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'letter-reveal': 'letter-reveal 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'logo-bar-1': 'logo-bar-1 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'logo-bar-2': 'logo-bar-2 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'blob': 'blob-animation 20s infinite ease-in-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
      }
    }
  },
  plugins: [],
}