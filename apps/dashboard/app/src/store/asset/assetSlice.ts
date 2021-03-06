import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAssets } from './assetAPI';
import { RootState } from '../store';

export interface Asset {
 externalReference: string;
 name: string;
 symbol: string;
}

export interface Cursor {
  previous: string;
  next: string;
}

export interface AssetPage {
  assets: Asset[],
  cursor: Cursor|null,
  page: number,
  pageSize: number,
  symbol: string|null
}

export interface AssetState {
  pages: AssetPage[],
  currentPage: number,
  currentPageSize: number
}

const initialState: AssetState = {
  pages: [],
  currentPage: 0,
  currentPageSize: 10
};

interface GetAsset {
  page: number,
  pageSize: number,
  symbol: string|null
}

export const getAssets = createAsyncThunk(
  'asset/get',
  async ({page, pageSize, symbol}: GetAsset, thunkAPI) => {

    const state: RootState|any = thunkAPI.getState()
    const { pages } = state.asset;

    const assetPage = pages[page];
    if (assetPage && assetPage.pageSize === pageSize && assetPage.symbol === symbol) {
      return assetPage;
    }

    const previousPage = pages[page - 1]
    console.log('getAssets previousPage', previousPage)
    let cursor = null;
    if (previousPage) {
      cursor = previousPage.cursor?.next || null;
    }
    const response = await fetchAssets(cursor, pageSize, symbol);

    return {
      assets: response.data.assets,
      cursor: response.data.cursor,
      page: page,
      pageSize: pageSize,
      symbol: symbol
    };
  }
);

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssets.fulfilled, (state, action) => {
      const existingPage = state.pages[action.payload.page];
      if (!existingPage || existingPage.pageSize !== action.payload.pageSize || existingPage.symbol !== action.payload.symbol ) {
        state.pages[action.payload.page] = action.payload;
      }

    })
  }
});

export const getAssetState = (state: RootState) => {
  return state.asset;
};

export default assetSlice.reducer;
