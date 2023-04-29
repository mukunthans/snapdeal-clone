import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartSlice from "../features/cart/cartSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice.reducer,

  },
});
