/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RS Peptides - Clinical Biotech Theme
        'theme-bg': '#FFFFFF',           // Pure White
        'theme-text': '#2E2E2E',         // Charcoal
        
        // Primary - Deep Science Blue
        'science-blue': {
          DEFAULT: '#0D3B66',
          50: '#E6EEF3',
          100: '#CDDDE7',
          200: '#9BBBCF',
          300: '#6999B7',
          400: '#37779F',
          500: '#0D3B66', // Primary
          600: '#092E48',
          700: '#072336',
          800: '#051724',
          900: '#020C12',
        },

        // Secondary - Biology Green
        'bio-green': {
          DEFAULT: '#6CBF4A',
          50: '#F0F9ED',
          100: '#E9F4E6', // Light Bio Green (Soft BG)
          200: '#C3E7B7',
          300: '#A5DB93',
          400: '#87CF6F',
          500: '#6CBF4A', // Secondary
          600: '#629B55',
          700: '#4A7440',
          800: '#314E2A',
          900: '#192715',
        },

        // Accents
        'tech-teal': {
          DEFAULT: '#1FA6A3',
          500: '#1FA6A3',
        },
        
        // Backgrounds
        'clinical-blue': '#EAF2F8',
        'cool-gray': '#F4F6F8',
        'charcoal': '#2E2E2E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['IBM Plex Sans', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'clinical': '0 2px 4px rgba(13, 59, 102, 0.05), 0 4px 12px rgba(13, 59, 102, 0.05)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',     // 6px
        'lg': '0.5rem',
        'full': '9999px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
