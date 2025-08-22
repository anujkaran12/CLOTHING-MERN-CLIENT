import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import userSliceReducer from "./userSlice";
import productsSliceReducer from "./productsSlice";
import wishlistReducer from "./wishlistSlice";
export default configureStore({
  reducer: {
    cartReducer: cartSliceReducer,
    userReducer: userSliceReducer,
    productsReducer: productsSliceReducer,
    wishlistReducer: wishlistReducer,
  },
});
