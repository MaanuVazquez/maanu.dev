/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    darkTheme: 'dark',
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]']
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]']
        }
      }
    ],
    base: false,
    utils: false,
    logs: false,
    rtl: false
  }
}
