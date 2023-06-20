import aspectRatio from "@tailwindcss/aspect-ratio";

import forms from "@tailwindcss/forms";

import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '4px 4px #0b0b0b',
        customHover: '7px 7px #0b0b0b',
      },
      fontFamily: {
        custom: ['Onest-Regular', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [
    aspectRatio,
    forms,
    typography,
  ],
};
