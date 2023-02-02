/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.css',
  ],
  theme: {
    fontFamily: {
      'sans': '"Open Sans", sans-serif',
      'serif': '"PT Serif", serif',
      'default': '"Open Sans", sans-serif'
    },
    extend: {
      '@apply': {
        'font-family': 'default'
      },
      minWidth: {
        '1/8': '12.5%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minHeight: {
        '1/8': '12.5%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {},
  plugins: [],
}
