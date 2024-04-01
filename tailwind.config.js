import { ColorTokens, ElevationTokens, ShapeTokens, TypographyTokens } from '@glare-labs/tailwindcss-material-tokens'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ...ColorTokens.FullTokens,
    ...TypographyTokens.FullTokens,
    ...ShapeTokens.FullTokens,
    ...ElevationTokens.FullTokens,
  ],
}

