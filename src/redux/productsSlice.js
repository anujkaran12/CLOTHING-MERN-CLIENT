import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/fetchAllProducts`
      );
      
      return res.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data || "Network error !");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsData: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productsData = []
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        
        state.productsData =  action.payload;
        
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
