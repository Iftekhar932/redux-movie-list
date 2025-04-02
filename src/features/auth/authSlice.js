import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_api } from "./authApi";

export const signup = createAsyncThunk(
  "auth/signupUser",
  async (userInfo, thunkAPI) => {
    console.log("🚀 ~ authSlice ~ userInfo:", userInfo);

    try {
      const response = await auth_api.post("/signup", userInfo);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ signup ~ error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signup.pending, (state, action) => {});
  },
});

export const user = (state) => state.auth.user;
export default authSlice.reducer;
