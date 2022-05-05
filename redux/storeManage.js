import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "storeManage",
  initialState: {
    jwt: "null",
    user: "null",
  },
  reducers: {
    updateJwt: (state, action) => {
      state.jwt = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateJwt, updateUser } = counterSlice.actions;

export default counterSlice.reducer;
