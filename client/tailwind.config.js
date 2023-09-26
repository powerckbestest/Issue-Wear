/** @type {import('tailwindcss').Config} */
export const purge = ['./src/**/*.{js,jsx,ts,tsx}', './index.html'];
export const darkMode = 'class';
export const theme = {
  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];
