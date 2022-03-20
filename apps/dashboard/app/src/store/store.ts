import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './wallet/walletSlice';
import assetReducer from './asset/assetSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    asset: assetReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

