import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


export const StyledFooterGrid = withStyles((theme) => ({
  root: {
    position: 'fixed',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  }
}))(Grid)

export const StyledFooterType = withStyles(() => ({
  root: {
    fontSize: '.8rem'
  }
}))(Typography)