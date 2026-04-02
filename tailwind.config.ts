import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5EFE0',
          300: '#EDE3CC',
        },
        bark: {
          50:  '#F5EFE8',
          100: '#E8D9C8',
          200: '#C9A882',
          300: '#A67C52',
          400: '#7D5A3C',
          500: '#5C3D2E',
          600: '#3D2314',
        },
        terra: {
          100: '#F2DACE',
          200: '#E5B49D',
          300: '#D4886A',
          400: '#C4714F',
          500: '#A85A3A',
        },
        lilac: {
          50:  '#F7F3FC',
          100: '#EDE5F8',
          200: '#D9CCF0',
          300: '#BFAAE3',
          400: '#A088CE',
          500: '#7E64B5',
          600: '#5E4890',
        },
        sage: {
          100: '#E8EDE3',
          200: '#C8D4BE',
          300: '#A4B896',
          400: '#7D9B6B',
          500: '#5C7A4E',
        },
        stone: {
          warm: '#8C7B6B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/paper-texture.png')",
      },
    },
  },
  plugins: [],
}
export default config
