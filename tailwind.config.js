/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      sm: '375px',
      lg: '1024px'
    },
    fontFamily: {
      sans: 'Rubik'
    },
    extend: {
      colors: {
        darkGray: 'hsl(0, 0%, 59%)',
        veryDarkGray: 'hsl(0, 0%, 17%)'
      },
      fontSize: {
        'heading': ['32px', {
          lineHeight: '30px',
          letterSpacing: '-0.29px'
        }],
        'input': ['18px', {
          lineHeight: '21px'
        }],
        'key': ['10px', {
          lineHeight: '12px',
          letterSpacing: '1.45833px'
        }],
        'value': ['20px', {
          lineHeight: '24px',
          letterSpacing: '-.78px'
        }]
      },
    }
  },
  plugins: [],
}
