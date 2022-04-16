import { MenuItem, Select } from '@material-ui/core';
import React from 'react';

export function MainAssetSelect({value, handleChange}: any) {
  return (
    <Select
      id="mainAsset"
      label="Main asset"
      value={value}
      onChange={handleChange}
      fullWidth
    >
      <MenuItem value={"BTC"}>BTC</MenuItem>
      <MenuItem value={"ETH"}>ETH</MenuItem>
    </Select>
  );
}
