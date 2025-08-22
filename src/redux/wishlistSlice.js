import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/wishlist`,

        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      return res.data; // updated cart
    } catch (err) {
      console.log(err);
      console.log(err)
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/wishlist`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      return res.data; // updated cart
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/wishlist`,
        {
          data: {
            productId: productId,
          },

          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      return res.data; // updated cart
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);

const productSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlistProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistProducts = action.payload;

        
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistProducts = action.payload;

        toast.success("Successfully added to wishlist");
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        toast.warn(action.payload);
      })

      // Remove from Cart
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistProducts = action.payload;
        toast.success("Product removed from wishlist");
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.warn(state.error);
      });
  },
});

export const { setWishlist } = productSlice.actions;
export default productSlice.reducer;
