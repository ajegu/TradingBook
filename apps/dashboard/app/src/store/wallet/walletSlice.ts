import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchWallet } from './walletAPI';

export interface WalletState {
  name: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WalletState = {
  name: '',
  status: 'idle'
};

export const getWalletAPI = createAsyncThunk(
  'wallet/get',
  async () => {
    const response = await fetchWallet();
    return response.data;
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    initWallet: (state) => {
      console.log('set wallet name')
      state.name = 'foo';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.name = action.payload;
      });
  }
});

export const { initWallet } = walletSlice.actions;

export const getWalletName = (state: RootState) => {
  console.log('root state', state)
  return  state.wallet.name;
};

export default walletSlice.reducer;
