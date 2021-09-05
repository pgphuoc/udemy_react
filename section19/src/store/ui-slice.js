import { createSlice } from '@reduxjs/toolkit';

const initialState = { isVisibleCart: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      state.isVisibleCart = !state.isVisibleCart;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
