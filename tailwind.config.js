/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#8B5CF6',
        surface: '#FFFFFF',
        text: '#111827',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['var(--font-pt-mono)', 'PT Mono', 'monospace'],
      },
      fontSize: {
        xs: '12',
        sm: '14',
        base: '16',
        lg: '20',
        xl: '28',
        '2xl': '36',
      },
      spacing: {
        '1': '4',
        '2': '8',
        '3': '12',
        '4': '16',
        '6': '24',
        '8': '32',
      },
    },
  },
  plugins: [],
}