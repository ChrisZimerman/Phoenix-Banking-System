import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchTransactionsApi,
    addTransactionApi,
    updateTransactionApi,
    deleteTransactionApi,
} from "../api/transactionsApi";
import textConstants from "../constants/textConstants";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTransactionsApi();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transaction, { rejectWithValue }) => {
        try {
            return await addTransactionApi(transaction);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async ({ id, amount }, { rejectWithValue }) => {
        try {
            return await updateTransactionApi({ id, amount });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id, { rejectWithValue }) => {
        try {
            return await deleteTransactionApi(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: { items: [], error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.payload || textConstants.notifications.errorBank;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.error = action.payload || textConstants.notifications.errorToken;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload || "Failed to update transaction.";
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter((transaction) => transaction.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete transaction.";
            });
    },
});

export default transactionsSlice.reducer;
