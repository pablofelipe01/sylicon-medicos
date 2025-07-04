/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          50: '#E5F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          50: '#FAF7E8',
          100: '#F5EFD1',
          200: '#EBDFA3',
          300: '#E0CE75',
          400: '#D6BE47',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#7F6921',
          800: '#554616',
          900: '#2A230B',
        },
        gradient: {
          start: '#9333EA',
          end: '#0066CC',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9333EA 0%, #0066CC 100%)',
      },
    },
  },
  plugins: [],
} 