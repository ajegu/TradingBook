import React from "react";
import styled, { withTheme } from "styled-components";

import Helmet from 'react-helmet';

import {
  Grid,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

function Overview() {
  return (
    <React.Fragment>
      <Helmet title="Wallet" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Wallet page
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
            {`Content will coming soon`}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(Overview);
