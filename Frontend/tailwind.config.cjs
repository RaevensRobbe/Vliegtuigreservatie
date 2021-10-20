module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  theme:{
    extend:{
      fontFamily:{
        'Montserrat': ['Montserrat']
      },
      colors: {
        'forest-green': '#008066',
        'cyprus-green': '#004D3D',
        'tomato-red': '#FC5757',
        'dim-gray': '#707070',
        'whisper-gray': '#ECECEC',
        'ghost-white': '#F8F8FF',
      }
    }
  }
}
