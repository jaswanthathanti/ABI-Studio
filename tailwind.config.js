/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#030507',
          900: '#050A12',
          850: '#080D17',
          800: '#0C1322',
          700: '#141E34',
          600: '#1D2A48',
        },
        electric: {
          DEFAULT: '#008CFF',
          glow: '#00A8FF',
          light: '#38BDF8',
          subtle: 'rgba(0, 168, 255, 0.15)',
        },
        amber: {
          accent: '#FFB45C',
          glow: '#FFA033',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(0, 168, 255, 0.4)',
        'glow-md': '0 0 25px -5px rgba(0, 168, 255, 0.5)',
        'glow-lg': '0 0 40px -8px rgba(0, 168, 255, 0.6)',
        'glow-cyan': '0 0 30px rgba(0, 168, 255, 0.35)',
        'panel-top': '0 -15px 40px -10px rgba(0, 168, 255, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, rgba(3,5,7,0.3) 0%, rgba(5,10,18,0.85) 75%, rgba(5,10,18,1) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'radar-ping': 'radarPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        radarPing: {
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
