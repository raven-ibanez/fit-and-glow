/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fit and Glow - Green Theme
        'theme-bg': '#FFFFFF',
        'theme-text': '#2C3E50',

        // Primary - Fit and Glow Forest Green (from logo)
        'blush': {
          DEFAULT: '#00703C',
          50: '#F0F9F4',
          100: '#E1F3E9',
          200: '#C2E7D3',
          300: '#85D0A7',
          400: '#48B97B',
          500: '#1BA05F',
          600: '#00703C', // Logo Forest Green
          700: '#005A30',
          800: '#004525',
          900: '#00301A',
        },

        // Secondary/Accent - Fit and Glow Lime Green
        'glow-teal': {
          DEFAULT: '#39B54A',
          50: '#F5FCF6',
          100: '#EBFAF0',
          200: '#D7F5E1',
          300: '#AFF0C2',
          400: '#39B54A', // Logo Lime Green
          500: '#2E923B',
          600: '#23702D',
          700: '#184D1F',
          800: '#0D2B11',
          900: '#030803',
        },

        // Secondary - Soft Gold/Accent
        'rose': {
          DEFAULT: '#FBBF24',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Neutral - Soft Charcoal
        'charcoal': {
          DEFAULT: '#3D3D3D',
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#DFDFDF',
          300: '#CFCFCF',
          400: '#9F9F9F',
          500: '#6F6F6F',
          600: '#5F5F5F',
          700: '#4F4F4F',
          800: '#3D3D3D', // Primary Text
          900: '#2D2D2D',
        },

        // Backgrounds
        'cream': '#FFFFFF',
        'blush-light': '#F5F3FF',
        'warm-white': '#FAFAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft': '0 2px 20px rgba(5, 150, 105, 0.06)',
        'luxury': '0 10px 40px rgba(5, 150, 105, 0.1)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.15)',
        'uplift': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
