import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";

// Configure Redux store
export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
