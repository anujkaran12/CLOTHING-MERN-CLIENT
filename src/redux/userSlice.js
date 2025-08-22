// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { setCart } from "./cartSlice";
import { setWishlist } from "./wishlistSlice";

// Async thunk to call the API
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      //   const token = localStorage.getItem("token");
      console.log("Fetch user run")
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/info`,
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      
      
      dispatch(setCart(res.data.cart))
      dispatch(setWishlist(res.data.wishlist))
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Network Error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ( registerData , { dispatch, rejectWithValue }) => {
    try {
      //   const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,

        registerData
      );

      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Network Error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state,action) => {
      localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY, null);
      state.userData = null
      toast.success("Logout Successfully");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // for register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Successfully registered");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to register");
        toast.error("Try again after sometime");
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
