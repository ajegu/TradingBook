import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';

import { Grid, Typography as MuiTypography } from '@material-ui/core';

import { spacing } from '@material-ui/system';
import { getWalletAPI, getWalletName } from '../store/wallet/walletSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Loader from '../components/Loader';

const Typography = styled(MuiTypography)(spacing);

function Default() {

  const dispatch = useAppDispatch();
  const wallet = useAppSelector(getWalletName);

  useEffect(() => {
    dispatch(getWalletAPI())
  });


  return wallet ? (
    <React.Fragment>
      <Helmet title='Wallet' />
      <Grid justify='space-between' container spacing={6}>
        <Grid item>
          <Typography variant='h3' display='inline'>
            Wallet page
          </Typography>
          <Typography variant='body2' ml={2} display='inline'>
            Wallet name is {wallet}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : <Loader />
}

export default Default;
