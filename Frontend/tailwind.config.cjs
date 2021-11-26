module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.svelte'],
    safelist: ['grid-cols-5', 'grid-cols-7', 'grid-cols-11'],
  },

  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat'],
      },
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        Montserrat: ['Montserrat'],
      },
      colors: {
        'forest-green': '#008066',
        'cyprus-green': '#004D3D',
        'tomato-red': '#FC5757',
        'dim-gray': '#707070',
        'whisper-gray': '#ECECEC',
        'ghost-white': '#F8F8FF',
      },
      screens: {
        '3xl': '1921px',
        xs: '490px',
      },
      backgroundImage: {
        'image-mainpage': "url('/HomePageImage.jpg')",
        'debit-credit-card': "url('FreePlasticCreditDebitCardMockup.png')",
      },
      spacing: {
        18: '4.5rem',
        38: '9.5rem',
      },
    },
  },
}
