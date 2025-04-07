import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_api } from "./authApi";

export const signup = createAsyncThunk(
  "auth/signupUser",
  async (userInfo, thunkAPI) => {
    try {
      const response = await auth_api.post("/signup", userInfo);
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.userInfo.accessToken);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ signup ~ error:", error.response.data);
      return thunkAPI.rejectWithValue({
        msg: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, thunkAPI) => {
    try {
      const response = await auth_api.post("/login", userInfo);
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue({
        msg: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    msg: null,
    resStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.msg = action.payload.message;
        state.user = action.payload.userInfo;
        login(action.payload.userInfo);
      })
      .addCase(signup.pending, (state, action) => {
        console.log("Pending...");
        state.msg = "Pending...";
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("🚀 ~ signup ~ error:", action.payload);
        state.msg = action.payload.msg;
        state.resStatus = action.payload.status;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.msg = action.payload.message;
      })
      .addCase(login.pending, (state, action) => {
        console.log("Pending...");
        state.msg = "Pending...";
      })
      .addCase(login.rejected, (state, action) => {
        console.log("🚀 ~ login ~ error:", action.payload);
        state.msg = action.payload.msg;
        state.resStatus = action.payload.status;
      });
  },
});

export const user = (state) => state.auth.user;
export const resInfo = (state) => state.auth;
export default authSlice.reducer;
