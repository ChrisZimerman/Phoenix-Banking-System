import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../store/transactionsSlice";
import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";
import Notification from "../components/Notification";
import styled from "styled-components";

const PageContainer = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    
`;

const Title = styled.h1`
    text-align: center;
    color: #003366;
`;

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <PageContainer>
            <Title>ניהול הפקדות</Title>
            <TransactionForm setNotification={setNotification} />
            
            {notification && (
                <Notification
                    message={notification.text} 
                    type={notification.type} 
                    onClose={() => setNotification(null)} 
                />
            )}
            
            <TransactionHistory setNotification={setNotification} />
        </PageContainer>
    );
};

export default TransactionsPage;
