import { createSlice, nanoid } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { email: "", password: "" },
  },
  reducers: {
    signup: {
      reducer: (state, action) => {
        const { id, email, password } = action.payload;
        state.user = { id, email, password };
        console.log(state.user);
      },
      prepare: (userInfo) => {
        return { payload: { id: nanoid(), ...userInfo } };
      },
    },
    login: {
      reducer: (state, action) => {
        const { email, password } = action.payload;
        state.user = { email, password };
        console.log(state.user);
      },
      prepare: (userInfo) => {
        return { payload: { id: nanoid(), ...userInfo } };
      },
    },
  },
});

export const { signup, login } = authSlice.actions;
export const user = (state) => state.auth.user;
export default authSlice.reducer;
