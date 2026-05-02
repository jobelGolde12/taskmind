/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D4432',
          foreground: '#F9F7F5',
        },
        secondary: {
          DEFAULT: '#E9E3DD',
          foreground: '#3E2B1E',
        },
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        surface: '#F9F7F5',
        background: '#F9F7F5',
        foreground: '#3E2B1E',
        neutral: '#F9F7F5',
        border: '#E9E3DD',
        muted: {
          DEFAULT: '#E9E3DD',
          foreground: '#5D4432',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      spacing: {
        'xs-2': '2px',
        'sm-4': '4px',
        'md-8': '8px',
        'lg-12': '12px',
        'xl-16': '16px',
        '2xl-24': '24px',
        '3xl-32': '32px',
        '4xl-48': '48px',
      },
    },
  },
  plugins: [],
}
