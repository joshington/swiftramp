import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutForumState {
  selectedCountry: string;
  localCurrencyInput: string;
  cryptoCurrencyOutput: string;
  paymentMethod: 'Mobile Money' | 'Credit Card' | '';
  mobileCarrier?: string;
  isBuying: boolean;
}

const initialState: CheckoutForumState = {
    selectedCountry: '',
    localCurrencyInput: '',
    cryptoCurrencyOutput: '',
    paymentMethod: '',
    mobileCarrier: '',
    isBuying: true
  };

export const CheckoutForumSlice = createSlice({
  name: 'checkoutForm',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    setLocalCurrencyInput: (state, action: PayloadAction<string>) => {
      state.localCurrencyInput = action.payload;
    },
    setCryptoCurrencyOutput: (state, action: PayloadAction<string>) => {
      state.cryptoCurrencyOutput = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<'Mobile Money' | 'Credit Card' | ''>) => {
      state.paymentMethod = action.payload;
    },
    setMobileCarrier: (state, action: PayloadAction<string | undefined>) => {
      state.mobileCarrier = action.payload;
    },
    setCryptoExchangeState: (state, action: PayloadAction<boolean>) => {
      state.isBuying = action.payload;
    },
    resetForum: () => initialState
  }
})

export const {
  setSelectedCountry,
  setLocalCurrencyInput,
  setCryptoCurrencyOutput,
  setPaymentMethod,
  setMobileCarrier,
  setCryptoExchangeState,
  resetForum
} = CheckoutForumSlice.actions;

export default CheckoutForumSlice.reducer;