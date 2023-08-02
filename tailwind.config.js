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
        'darker-grey-blue': '#0b1114',
        'red-weight': '#ff422b',
        'gray-weight': '#283f4e',
        'main-red': '#ff007a',
        'yellow-weight': '#FFC107',
      },
      backgroundImage: {
        'dark-pink': 'linear-gradient(to right,hsla(0,0%,100%,.15),#ff007a)',
        'dark-green': 'linear-gradient(to right,hsla(0,0%,100%,.15),#00e9b1)'
      },
      blur: {
        'xxs': '1px'
      },
      width: {
        '17.5': '70px'
      },
      borderRadius: {
        'large': '12px'
      }
    },
  },
  plugins: [],
}

