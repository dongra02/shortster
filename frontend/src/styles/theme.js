import { createMuiTheme } from '@material-ui/core/styles'
// import red from '@material-ui/core/colors/red'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#43bce7'
    },
    text: {
      primary: '#1E4B5B'
    }
  },

  typography: {
    fontFamily: '"open-sans", Helvetica, Arial, "sans-serif"'
  }
})

export default theme