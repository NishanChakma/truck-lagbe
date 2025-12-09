import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  resetSignal: number;
  sortingOrderFromLatest: boolean;
  currentNav?: string;
  currentDriverInfo: object;
}

const initialState: CounterState = {
  resetSignal: 0,
  sortingOrderFromLatest: true,
  currentNav: 'সব',
  currentDriverInfo: {},
};

export const rootSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    resetAll: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.resetSignal += 1;
      state.sortingOrderFromLatest = true;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    setSortingOrder: (state, action: { payload: boolean }) => {
      state.sortingOrderFromLatest = action.payload;
    },
    setCurrentNav: (state, action: { payload: string }) => {
      state.currentNav = action.payload;
    },
    setCurrentDriverInfo: (state, action: { payload: object }) => {
      state.currentDriverInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetAll,
  setSortingOrder,
  setCurrentNav,
  setCurrentDriverInfo,
} = rootSlice.actions;

export default rootSlice.reducer;
