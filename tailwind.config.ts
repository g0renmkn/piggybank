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
          d0: "#0c0000",
          d1: "#190605",
          d2: "#210907",
          d3: "#381414",
          d4: "#994943",
        },
        primary: {
          brightest: "#d7ddea",
          brighter: "#aab9e0",
          bright: "#95a3c9",
          normal: "#7c8aad",
          dark: "#414b66",
          darker: "#1f273f",
          darkest: "#0c101e"
        },
        secondary: {
          brightest: "#ead7d7",
          brighter: "#e0aaaa",
          bright: "#c99995",
          normal: "#ad827c",
          dark: "#664341",
          darker: "#3f1f1f",
          darkest: "#1e0c0c"
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
