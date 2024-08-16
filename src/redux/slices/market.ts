import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarket, InitalMarketState } from '../interface';
import { HexString } from '../../constants/contracts-abi';

const initialState: InitalMarketState = {
  marketData: [],
  loading: false,
  user: {
    userTokenInfo: {
      address: '',
      balance: '',
      allowance: '',
    },
  },
  tokenInfo:
    {
      mcr: '',
      name: '',
      tokenPrice: 0,
      collateral: '',
      borrowApr: '',
      tvl: '',
      icon: '',
      tokenAddress: '',
    } || {},
};

export const counterSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketData: (state, action: PayloadAction<IMarket[]>) => {
      state.marketData = [...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    fetchIndividualMerketData: (state, action: PayloadAction<HexString>) => {
      if (state.marketData && state.marketData.length > 0) {
        const tokenInfo = state.marketData.find(
          (token) => token.tokenAddress === action.payload
        ) as any;
        state.tokenInfo = { ...tokenInfo };
      }
    },

    getUserInfo: (
      state,
      action: PayloadAction<{
        address: HexString;
        balance: string;
        allowance: string;
      }>
    ) => {
      const { user } = state;
      const { balance, address, allowance } = action.payload;
      state.user.userTokenInfo = {
        ...user.userTokenInfo,
        balance: balance.toString(),
        address,
        allowance,
      };
    },
  },
});

export const {
  setMarketData,
  setLoading,
  getUserInfo,
  fetchIndividualMerketData,
} = counterSlice.actions;

export default counterSlice.reducer;
