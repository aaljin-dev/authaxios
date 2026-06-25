import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: null,
  loading: false,
  errorMessage: null,
  networkError: null,
  login: false,
  data: {
    // userId: null,
    code: null,
    channel: null,
    contactNumber: null,
    // email: null,
    purpose: null,
  },
};

const baseURL =
  "https://nena-unsuburbed-asymmetrically.ngrok-free.dev/api/v1/auth/";

// registerUser
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}register`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
      console.log("error", error);
    }
  },
);

//LoginUser
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    clearError: (state) => {
      state.errorMessage = null;
      state.networkError = null;
    },
    setLogin: (state) => {
      state.login = !state.login;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log("fullfil", action.payload);
        console.log("fullfil", action.payload.data.otp.code);
        state.data.code = action.payload.data.otp.code;
        state.success = action.payload.success;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.networkError = action.payload;
        state.errorMessage =
          action.payload?.message || action.payload || action.error?.message;

        console.log("rejectedRegister", action.payload);
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.code = action.payload.data.otp.code;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.networkError = action.payload;
        state.errorMessage =
          action.payload?.message || action.payload || action.error?.message;

        console.log("rejectedLogin", action.payload);
      });
  },
});

export default authSlice.reducer;

export const { resetSuccess, clearError, setLogin } = authSlice.actions;
