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
          1: "#000511"
        },
        text: {
          1: "#7c8aad"
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
