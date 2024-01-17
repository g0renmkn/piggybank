import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Custom color names for the theme */
        background: {
          0: "#00030c",
          1: "#050b19",
          2: "#081021",
          3: "#151f38",
          4: "#435d99",
        },
        primary: {
          normal: "#7c8aad",
          bright: "#d7ddea",
          dark: "#112351",
        }
      },
      fontFamily: {
        genos: ['var(--font-genos)'],
        grotesk: ['var(--font-grotesk)'],
        inter: ['var(--font-inter)'],
        josefin: ['var(--font-josefin)'],
        overlock: ['var(--font-overlock)'],
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
