
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Cartitem {
    id: number;
    title:string;
    image:string;
    price: number
}

const cartSlice = createSlice({
    name: "Cart",
    initialState: [] as Cartitem[],
    reducers: {
      add(state, action: PayloadAction<Cartitem>) {
        state.push(action.payload);
      },
      remove(state, action: PayloadAction<number>) {
        return state.filter((item) => item.id !== action.payload);
      },
    },
  });
  
  export const { add, remove } = cartSlice.actions;
  export default cartSlice.reducer;