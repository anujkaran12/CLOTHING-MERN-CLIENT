import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log("Fetch cart")
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart`,

        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);

// Add to Cart API call
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size }, { getState, rejectWithValue }) => {
    try {
      if (!quantity || !size) {
        return rejectWithValue("Please select Quantity and Size");
      }
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart`,
        {
          productId,
          quantity,
          size,
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
      return rejectWithValue(err.response?.data || "Error adding to cart");
    }
  }
);

// Remove from Cart API call
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart`,
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
          data: {
            productId: productId,
          },
        }
      );

      return res.data; // updated cart
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "Error removing from cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartProducts: [], loading: false, error: null, alert: "" },
  reducers: {
    setCart: (state, action) => {
      state.cartProducts = action.payload;
    },
    cartTotalPrice: (state, action) => {
      return 800;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        // state.loading = true;
        // state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // state.loading = false;
        state.cartProducts = action.payload;

        toast.success("Successfully added");
      })
      .addCase(addToCart.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.payload;

        toast.error(action.payload);
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;

        toast.success("Product removed");
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;

        toast.error(action.payload);
      });
  },
});

export const { setCart, cartTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
