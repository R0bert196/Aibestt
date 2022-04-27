module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
     colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'primary': '#4e73df',
      'secondary':'#f8f9fc',
      'accent': '#ff0000',
      'gray': '#6c757d',
    },
    fontFamily: {
       'nunito': ['Lato', 'sans-serif', 'Staatliches', 'cursive'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'mw1024': {'max': '1024px'}
    }
  },
  plugins: [],
}