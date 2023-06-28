import typography from '@tailwindcss/typography'
import daisyUI from 'daisyui'
// @ts-ignore
import daisyThemes from 'daisyui/src/theming/themes'

import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyUI],
  daisyui: {
    darkTheme: 'dark',
    styled: true,
    themes: [
      {
        light: {
          ...daisyThemes['[data-theme=light]'],
          primary: '#B2A4FF',
          accent: '#FFDEB4'
        },
        dark: {
          ...daisyThemes['[data-theme=dark]'],
          primary: '#B2A4FF',
          accent: '#FFDEB4'
        }
      }
    ],
    base: false,
    utils: false,
    logs: false,
    rtl: false
  }
} satisfies Config
