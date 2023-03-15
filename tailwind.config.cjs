/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
    colors: {
      'icons': 'rgba(239, 238, 224, 0.25)',
    },
    screens: {
      'sm': '588px',
      'md': '768px',
     'lg': '1024px',
      'xl': '1280px',
    },
  
    fontFamily: {
      'body' : ['Quicksand'],
    }
  }
  },
  plugins: [],
}
