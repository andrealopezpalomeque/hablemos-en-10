/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fffbf5',
          100: '#f7f0e8',
          200: '#f0e6d6',
          300: '#e8ddd0',
          400: '#d4c4b0',
          500: '#c4915e',
          600: '#b07d4a',
          700: '#9b8b7a',
          800: '#5c4a3a',
          900: '#3d3229',
        },
        cream: '#fffbf5',
        sand: '#f7f0e8',
        // Per-category accent colors
        cat: {
          cultura:   { bg: '#fef3e2', text: '#b8621b', border: '#f4c67a' },
          educacion: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
          economia:  { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' },
          politica:  { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
          viajes:    { bg: '#f3e5f5', text: '#7b1fa2', border: '#ce93d8' },
          mundo:     { bg: '#e0f7fa', text: '#00695c', border: '#80cbc4' },
          vida:      { bg: '#fbe9e7', text: '#bf360c', border: '#ffab91' },
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        heading: ['"Merriweather"', 'Georgia', 'serif'],
      },
      fontSize: {
        'body': ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        'title': ['1.5rem', { lineHeight: '2rem' }],          // 24px
        'display': ['2rem', { lineHeight: '2.75rem' }],        // 32px
        'timer': ['5.25rem', { lineHeight: '1' }],             // 84px
      },
    },
  },
  plugins: [],
}
