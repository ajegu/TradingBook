import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl as MuiFormControl, InputLabel
} from '@material-ui/core';
import { MainAssetSelect } from './MainAssetSelect';
import styled from "styled-components";
import { spacing } from "@material-ui/system";

export type AddFormProps = {
  open: boolean,
  handleClose: any
};

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)<{m?: number}>`
  min-width: 148px;
  width: 100%
`;

const TradeAddForm = ({open, handleClose}: AddFormProps) => {

  const [mainAsset, setMainAsset] = useState<string>('');
  const handleMainAsset = (event: ChangeEvent<HTMLInputElement>) => {
    setMainAsset(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Add new trade</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new trade, please select a main asset (BTC) and a secondary asset (USDT).
        </DialogContentText>
        <form autoComplete="off">
          <FormControl m={1}>
            <InputLabel htmlFor="mainAsset">Main asset</InputLabel>
            <MainAssetSelect value={mainAsset} handleChange={handleMainAsset} />
          </FormControl>
        </form>

        {/*<TextField*/}
        {/*  autoFocus*/}
        {/*  margin='dense'*/}
        {/*  id='mainAsset'*/}
        {/*  label='Main asset'*/}
        {/*  type='text'*/}
        {/*  fullWidth*/}
        {/*/>*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleClose} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default TradeAddForm;
