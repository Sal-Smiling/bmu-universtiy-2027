/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bmu: {
          red: '#E60000',
          pink: '#FF4D85',
          bg: '#F8FAFC',       // Light Natural Fresh botanical off-white
          surface: '#FFFFFF',  // Pure crisp white surface
          card: '#FFFFFF',     // Clean white card with soft natural shadow
          muted: '#F1F5F9',    // Natural soft slate accent
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', '"Kantumruy Pro"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-bmu': 'linear-gradient(135deg, #E60000 0%, #FF4D85 100%)',
        'gradient-fresh': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-red': '0 10px 25px -5px rgba(230, 0, 0, 0.25)',
        'glow-pink': '0 10px 25px -5px rgba(255, 77, 133, 0.25)',
        'glow-bmu': '0 15px 35px -10px rgba(230, 0, 0, 0.2), 0 10px 20px -10px rgba(255, 77, 133, 0.15)',
        'glass': '0 8px 32px 0 rgba(148, 163, 184, 0.15)',
        'natural': '0 10px 30px -5px rgba(148, 163, 184, 0.25), 0 4px 10px -5px rgba(148, 163, 184, 0.1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
