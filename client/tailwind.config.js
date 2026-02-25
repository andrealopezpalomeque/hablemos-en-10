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
          50: '#fdf8f0',
          100: '#f9edd8',
          200: '#f3d9b0',
          300: '#ebc07e',
          400: '#e2a24e',
          500: '#d98a2f',
          600: '#c47124',
          700: '#a35720',
          800: '#854621',
          900: '#6d3b1e',
        },
        cream: '#fdf8f0',
        sand: '#f5e6d0',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px min
        'title': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        'display': ['2rem', { lineHeight: '2.5rem' }],       // 32px
        'timer': ['3rem', { lineHeight: '3.5rem' }],         // 48px
      },
    },
  },
  plugins: [],
}
