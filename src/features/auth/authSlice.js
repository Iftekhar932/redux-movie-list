import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, auth_api } from "./authApi";

export const signup = createAsyncThunk(
  "auth/signupUser",
  async (userInfo, thunkAPI) => {
    try {
      const response = await auth_api.post(API_ENDPOINTS.SIGNUP, userInfo);
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
      const response = await auth_api.post(API_ENDPOINTS.LOGIN, userInfo);
      localStorage.setItem("accessToken", response.data.userInfo.accessToken);
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

export const logout = () => {
  localStorage.removeItem("accessToken");
  return {
    type: "auth/logout",
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    msg: null,
    resStatus: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.msg = null;
      state.resStatus = null;
    },
    /* setUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.msg = action.payload.message;
        state.user = action.payload.userInfo;
        state.isLoggedIn = true;
        login(action.payload.userInfo);
      })
      .addCase(signup.pending, (state, action) => {
        console.log("Pending...");
        state.msg = "Pending...";
      })
      .addCase(signup.rejected, (state, action) => {
        console.error("🚀 ~ signup ~ error:", action.payload);
        state.msg = action.payload.msg;
        state.resStatus = action.payload.status;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.msg = action.payload.message;
        state.isLoggedIn = true;
      })
      .addCase(login.pending, (state, action) => {
        console.log("Pending...");
        state.msg = "Pending...";
      })
      .addCase(login.rejected, (state, action) => {
        console.error("🚀 ~ login ~ error:", action.payload);
        state.msg = action.payload.msg;
        state.resStatus = action.payload.status;
        state.isLoggedIn = false;
      });
  },
});

export const user = (state) => state.auth.user;
export const resInfo = (state) => state.auth;
export default authSlice.reducer;
