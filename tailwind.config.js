/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic color system
        bg: {
          DEFAULT: '#f8fafc', // Light mode background
          dark: '#0f172a',    // Dark mode background
        },
        surface: {
          DEFAULT: '#ffffff', // Light mode surface
          dark: 'rgb(35, 38, 43)',    // Dark mode surface
        },
        copy: {
          DEFAULT: '#1f2937', // Light mode text
          dark: '#e2e8f0',    // Dark mode text
        },
        muted: {
          DEFAULT: '#6b7280', // Light mode muted text
          dark: '#94a3b8',    // Dark mode muted text
        },
        accent: {
          DEFAULT: '#14b8a6', // Light mode accent
          dark: '#0ea5e9',    // Dark mode accent
        },
        palette4: {
          bg: '#f6f5f3',
          surface: '#ffffff',
          primary: '#88A5BC',
          secondary: '#A1A79E',
          text: '#22223b',
          muted: '#7c7c7c',
        },
        // Keep primary colors for backward compatibility
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        jetbrains: ['JetBrains Mono', 'Fira Code', 'monospace'],
        orbitron: ['Orbitron', 'Montserrat', 'ui-sans-serif', 'system-ui'],
        audiowide: ['Audiowide', 'Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 