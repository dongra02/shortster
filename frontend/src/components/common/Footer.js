import React from 'react'

import Grid from '@material-ui/core/Grid'
import { StyledFooterGrid, StyledFooterType } from '../../elements/FooterGrid'

const Footer = () => {

  return (
    <StyledFooterGrid container spacing={2}>
      <Grid item>
        <StyledFooterType>An Application by Don</StyledFooterType>
      </Grid>
    </StyledFooterGrid>
  )
}

export default Footer