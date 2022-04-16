import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Breadcrumbs as MuiBreadcrumbs, Button, Grid, Link, Typography as MuiTypography } from '@material-ui/core';
import { LinkProps, NavLink as RouterNavLink } from 'react-router-dom';
import { spacing } from '@material-ui/system';
import { Add as AddIcon } from '@material-ui/icons';
import TradeAddForm from '../components/Trades/AddForm';

const Typography = styled(MuiTypography)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


const NavLink = React.forwardRef<LinkProps, any>((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));


function Trades() {

  const [newTrade, setNewTrade] = useState(false);

  const handleNewTrade = () => {
    setNewTrade(true);
  };

  const handleCloseNewTrade = () => {
    setNewTrade(false);
  };

  function OpenNewTrade() {
    return newTrade ? <TradeAddForm open={newTrade} handleClose={handleCloseNewTrade}  /> : null;
  }

  return (
    <React.Fragment>
      <Helmet title='Trades' />
      <Grid justify='space-between' container spacing={6}>
        <Grid item>
          <Typography variant='h3' display='inline'>
            Trades
          </Typography>

          <Breadcrumbs aria-label='Breadcrumb' mt={2}>
            <Link component={NavLink} exact to='/'>
              Dashboard
            </Link>
            <Typography>Trades</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item>
          <Button variant='contained' color='primary' onClick={handleNewTrade}>
            <AddIcon />
            New Trade
          </Button>
        </Grid>
      </Grid>
      <OpenNewTrade />
    </React.Fragment>
  );
}

export default Trades;
