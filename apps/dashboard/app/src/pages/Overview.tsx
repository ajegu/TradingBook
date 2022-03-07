import React from "react";
import styled from "styled-components";

import { Helmet } from 'react-helmet';

import {
  Grid,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

function Default() {
  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Overview page
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
          {`content will coming soon`}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
