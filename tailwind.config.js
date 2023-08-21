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
      backgroundImage: {
        'header-pattern': 'url("images/pattern-bg.png"), linear-gradient(to bottom,hsla(224, 85%, 66%) 2.99%,hsla(245, 42%, 42%) 50%)'
      },
      colors: {
        darkGray: 'hsl(0, 0%, 59%)',
        buttonHoverGray: 'hsl(0, 0%, 25%)',
        veryDarkGray: 'hsl(0, 0%, 17%)'
      },
      fontSize: {
        base: '62.5%',
        'heading-lg': ['3.2rem', {
          lineHeight: '3.0rem',
          letterSpacing: '-0.29px'
        }],
        'heading': ['2.6rem', {
          lineHeight: '3.0rem',
          letterSpacing: '-0.23px'
        }],
        'input': ['1.8rem', {
          lineHeight: '2.1rem'
        }],
        'key': ['1.0rem', {
          lineHeight: '1.2rem',
          letterSpacing: '1.45833px'
        }],
        'key-lg': ['1.2rem', {
          lineHeight: '1.4rem',
          letterSpacing: '1.75px'
        }],
        'value': ['2.0rem', {
          lineHeight: '2.4rem',
          letterSpacing: '-.78px'
        }],
        'value-lg': ['2.6rem', {
          lineHeight: '3.0rem',
          letterSpacing: '-0.232143px'
        }],
        'error': ['1.0rem', {
          lineHeight: '1.2rem',
          letterSpacing: '-0.23px'
        }],
        'error-lg': ['1.2rem', {
          lineHeight: '1.4rem',
          letterSpacing: '-0.23px'
        }],
      },
    }
  },
  plugins: []
}
