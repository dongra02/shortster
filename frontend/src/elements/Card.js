import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

export const StyledCard = withStyles(() => ({
  root: {
    border: '1px solid #43bce7',
    borderRadius: '15px',
    maxWidth: 400,
    margin: '0 auto'
  }
}))(Card)

export const StyledCardButton = withStyles(() => ({
  root: {
    margin: '0 auto'
  }
}))(Button)