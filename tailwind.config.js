/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-light': '#ced4da',
        'green-weight': '#20eb7a',
        'dark-grey-blue': '#142028',
        'red-weight': '#ff422b',
        'gray-weight': '#24242c'
      },
      backgroundImage: {
        'dark-pink': 'linear-gradient(to right,hsla(0,0%,100%,.15),#ff007a)',
        'dark-green': 'linear-gradient(to right,hsla(0,0%,100%,.15),#00e9b1)'
      },
      blur: {
        'xxs': '1px'
      }
    },
  },
  plugins: [],
}

