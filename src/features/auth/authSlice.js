import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_api } from "./authApi";

export const signup = createAsyncThunk(
  "auth/signupUser",
  async (userInfo, thunkAPI) => {
    try {
      const response = await auth_api.post("/signup", userInfo);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ signup ~ error:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, thunkAPI) => {
    try {
      const response = await auth_api.post("/login", userInfo);
      return response.data;
    } catch (error) {
      console.log(error.reponse.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("fulfilled", action.payload);
      state.user = action.payload;
    });
    builder.addCase(signup.pending, (state, action) => {
      console.log("Pending...");
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("🚀 ~ signup ~ error:", action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("fulfilled", action.payload);
      state.user = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      console.log("Pending...");
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("🚀 ~ signup ~ error:", action.payload);
    });
  },
});

export const user = (state) => state.auth.user;
export default authSlice.reducer;
