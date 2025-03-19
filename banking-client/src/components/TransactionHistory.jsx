import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, updateTransaction, deleteTransaction } from "../store/transactionsSlice";
import TransactionFilter from "./TransactionFilter";
import textConstants from "../constants/textConstants";  
import { TableContainer, Title, Table, Thead, Th, Td, ActionButton, DeleteButton } from "../styles/TransactionHistory.styles.js";

const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

const TransactionHistory = ({ setNotification }) => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.items);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [editedAmount, setEditedAmount] = useState("");

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleFilter = (searchId, searchName) => {
        if (!searchId && !searchName) {
            setFilteredTransactions(transactions);
            return;
        }

        let filtered = transactions.filter(t => {
            const matchesId = searchId ? t.userId.includes(searchId) : true;
            const matchesName = searchName ? t.fullNameHebrew.includes(searchName) : true;
            return matchesId && matchesName;
        });

        setFilteredTransactions(filtered);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction.id);
        setEditedAmount(transaction.amount.toString());
    };



    const handleSaveEdit = async () => {
        if (!editingTransaction) return;
        const updatedAmount = Number(editedAmount);
        if (isNaN(updatedAmount) || updatedAmount <= 0) {
            setNotification({ text: textConstants.validation.amount, type: "error" });
            return;
        }
    
        try {
            await dispatch(updateTransaction({ id: editingTransaction, amount: updatedAmount })).unwrap();
            setNotification({ text: textConstants.notifications.successEdit, type: "success" });
        } catch (error) {
            setNotification({ text: error || "עדכון נכשל", type: "error" });
        }
    
        setEditingTransaction(null);
        setEditedAmount("");
        dispatch(fetchTransactions());
    };

    
    const handleDelete = async (id) => {
        await dispatch(deleteTransaction(id));
        dispatch(fetchTransactions()); 
        setNotification({ text: textConstants.notifications.successDelete, type: "success" });
    };

    return (
        <TableContainer>
            <Title>{textConstants.labels.transactionsHistory}</Title>
            <TransactionFilter onFilter={handleFilter} />
            <Table>
                <Thead>
                    <tr>
                        <Th>{textConstants.labels.userId}</Th>
                        <Th>{textConstants.labels.fullNameHebrew}</Th>
                        <Th>{textConstants.labels.fullNameEnglish}</Th>
                        <Th>{textConstants.labels.birthDate}</Th>
                        <Th>{textConstants.labels.accountNumber}</Th>
                        <Th>{textConstants.labels.amount}</Th>
                        <Th>סטטוס</Th>
                        <Th>תאריך הפקדה</Th>
                        <Th>פעולות</Th>
                    </tr>
                </Thead>
                <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <Td>{transaction.userId}</Td>
                            <Td>{transaction.fullNameHebrew}</Td>
                            <Td>{transaction.fullNameEnglish}</Td>
                            <Td>{formatDate(transaction.birthDate)}</Td>
                            <Td>{transaction.accountNumber}</Td>
                            <Td>
                                {editingTransaction === transaction.id ? (
                                    <input
                                        type="text" 
                                        value={editedAmount}
                                        onChange={(e) => setEditedAmount(e.target.value.replace(/\D/g, ""))} 
                                    />
                                ) : (
                                    <span>{transaction.amount}</span>
                                )}
                            </Td>
                            <Td>{transaction.status}</Td>
                            <Td>{formatDate(transaction.transactionDate)}</Td>
                            <Td>
                                {editingTransaction === transaction.id ? (
                                    <>
                                        <ActionButton onClick={handleSaveEdit}>שמור</ActionButton>
                                        <DeleteButton onClick={() => setEditingTransaction(null)}>בטל</DeleteButton>
                                    </>
                                ) : (
                                    <>
                                        <ActionButton onClick={() => handleEdit(transaction)}>ערוך</ActionButton>
                                        <DeleteButton onClick={() => handleDelete(transaction.id)}>מחק</DeleteButton>
                                    </>
                                )}
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default TransactionHistory;
