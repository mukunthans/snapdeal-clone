
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalCartPrice: 0,
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addItemToCart(state, actions) {
        const newItem = actions.payload;
        const existingItem = state.items.find((item) => item.id === newItem.id);
        
      state.totalQuantity++;
      state.totalCartPrice += newItem.price;         
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          thumbnail: newItem.thumbnail,
          discountPercentage: newItem.discountPercentage,
        });
      }
    },
    removeItemFromCart(state, actions) {
        const id = actions.payload;
        
        const findItem = state.items.find((item) => item.id === id);
        state.totalQuantity--;
        state.totalCartPrice -= findItem.price;
        if (findItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          findItem.quantity--;
          findItem.totalPrice -= findItem.price;
        }
      },
      deleteCart(state) {
        state.items = [];
        state.totalQuantity = 0;
        state.totalCartPrice = 0;
      }
    },
});

export default cartSlice;

export const {addItemToCart,removeItemFromCart,deleteCart} = cartSlice.actions;
