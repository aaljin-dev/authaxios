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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
      console.log("error", error);
    }
  },
);

//registerOtp
// export const registerOtpVerify = createAsyncThunk(
//   "auth/registerOtp",
//   async (data ,{rejectWithValue}) => {
//     try{
//       const response = await axios.post(`${baseURL}verify-otp`,data);
//       console.log("regi");

//     }
//   }
// )

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("pendingRegister");
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.success = action.payload.success;
        state.loading = false;
        state.errorMessage = null;
        state.isfetched = true;
        state.data.code = action.payload.data.otp.code;
        // state.data.userId = action.payload.data.otp.userId;
        state.data.contactNumber = action.payload.data.customer.contactNumber;
        state.data.purpose = action.payload.data.otp.purpose;
        state.data.channel = action.payload.data.otp.channel;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("rejectRegister");
        console.log(action.payload);
        state.networkError = action.payload;

        // state.success = false;
        state.success = action.payload.data.success;
        state.loading = false;
        state.errorMessage =
          action.payload?.message || action.payload || action.error.message;
        console.log(state.errorMessage);
      });
  },
});

export default authSlice.reducer;

export const { resetSuccess } = authSlice.actions;
