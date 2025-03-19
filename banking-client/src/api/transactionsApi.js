import axios from "axios";

const BASE_URL = "http://localhost:5184/api/Transactions";

export const fetchTransactionsApi = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch transactions.";
    }
};

export const addTransactionApi = async (transaction) => {
    try {
        const response = await axios.post(BASE_URL, transaction);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to add transaction.";
    }
};

export const updateTransactionApi = async ({ id, amount }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, { id, amount: Number(amount) });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to update transaction.";
    }
};

export const deleteTransactionApi = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    } catch (error) {
        throw error.response?.data || "Failed to delete transaction.";
    }
};
