/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      md: '1070px',
    },
    extend: {
      screens: {
        handset: { max: 'var(--handset)' },
        desktop: { min: 'var(--handset)' },
      },
    },
    fontFamily: {
      yatra: ['var(--font-family-yatra)', 'sans-serif'],
      vinque: ['var(--font-family-vinque)', 'sans-serif'],
    },
    backgroundImage: {
      'bg-desktop': "url('src/assets/images/bg-desktop.png')",
      'bg-mobile': "url('src/assets/images/bg-mobile.png')",
    },
    colors: {
      beige: 'var(--font-beige)',
      light: 'var(--font-light)',
      white: 'var(--font-white)',
      black: 'var(--font-black)',
    },
  },
  plugins: [],
}
