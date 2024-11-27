import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    authId: '',
  },
  reducers: {
    updateAuthId: (state, actions) => {
      state.authId = actions.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAuthId
} = DataSlice.actions

export default DataSlice.reducer