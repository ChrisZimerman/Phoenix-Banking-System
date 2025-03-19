import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/transactionsSlice";
import textConstants from "../constants/textConstants";
import {
    FormContainer,
    Input,
    Label,
    Select,
    ButtonsContainer,
    Button,
    ClearButton,
    ErrorText
} from "../styles/TransactionForm.styles";

const initialState = {
    fullNameHebrew: "",
    fullNameEnglish: "",
    birthDate: "",
    userId: "",
    accountNumber: "",
    amount: "",
    actionType: "Deposit",
};

const TransactionForm = ({ setNotification }) => { 
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setTransaction(initialState);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!transaction.fullNameHebrew.match(/^[א-ת' -]{1,20}$/)) {
            newErrors.fullNameHebrew = textConstants.validation.fullNameHebrew;
        }
        if (!transaction.fullNameEnglish.match(/^[A-Za-z' -]{1,15}$/)) {
            newErrors.fullNameEnglish = textConstants.validation.fullNameEnglish;
        }
        if (!transaction.userId.match(/^\d{9}$/)) {
            newErrors.userId = textConstants.validation.userId;
        }
        if (!transaction.accountNumber.match(/^\d{1,10}$/)) {
            newErrors.accountNumber = textConstants.validation.accountNumber;
        }
        if (isNaN(transaction.amount) || transaction.amount <= 0) {
            newErrors.amount = textConstants.validation.amount;
        }
        if (!transaction.birthDate) {
            newErrors.birthDate = textConstants.validation.birthDate;
        }
        if (!transaction.actionType) {
            newErrors.actionType = textConstants.validation.actionType;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            await dispatch(addTransaction({ ...transaction })).unwrap();
            setNotification({ text: textConstants.notifications.successDeposit, type: "success" });
            handleClearForm();
        } catch (error) {
            setNotification({ text: error || textConstants.notifications.errorBank, type: "error" });
        }
    };
    
    

    const handleClearForm = () => {
        setTransaction(initialState);
        setErrors({});
        setNotification(null);
    };

    return (
        <FormContainer>
            <h2>{textConstants.labels.depositFormTitle}</h2>
            <form onSubmit={handleSubmit} noValidate>
                <Label>{textConstants.labels.fullNameHebrew} <span style={{ color: "red" }}>*</span></Label>
                <Input type="text" name="fullNameHebrew" value={transaction.fullNameHebrew} onChange={handleChange} />
                {errors.fullNameHebrew && <ErrorText>{errors.fullNameHebrew}</ErrorText>}

                <Label>{textConstants.labels.fullNameEnglish} <span style={{ color: "red" }}>*</span></Label>
                <Input type="text" name="fullNameEnglish" value={transaction.fullNameEnglish} onChange={handleChange} />
                {errors.fullNameEnglish && <ErrorText>{errors.fullNameEnglish}</ErrorText>}

                <Label>{textConstants.labels.birthDate} <span style={{ color: "red" }}>*</span></Label>
                <Input type="date" name="birthDate" value={transaction.birthDate} onChange={handleChange} />
                {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}

                <Label>{textConstants.labels.userId} <span style={{ color: "red" }}>*</span></Label>
                <Input type="text" name="userId" value={transaction.userId} onChange={handleChange} />
                {errors.userId && <ErrorText>{errors.userId}</ErrorText>}

                <Label>{textConstants.labels.accountNumber} <span style={{ color: "red" }}>*</span></Label>
                <Input type="text" name="accountNumber" value={transaction.accountNumber} onChange={handleChange} />
                {errors.accountNumber && <ErrorText>{errors.accountNumber}</ErrorText>}

                <Label>{textConstants.labels.amount} <span style={{ color: "red" }}>*</span></Label>
                <Input type="number" name="amount" value={transaction.amount} onChange={handleChange} />
                {errors.amount && <ErrorText>{errors.amount}</ErrorText>}

                <Label>{textConstants.labels.actionType}</Label>
                <Select name="actionType" value={transaction.actionType} onChange={handleChange}>
                    <option value="Deposit">{textConstants.labels.deposit}</option>
                    <option value="Withdrawal">{textConstants.labels.withdrawal}</option>
                </Select>

                <ButtonsContainer>
                    <Button type="submit">{textConstants.labels.submit}</Button>
                    <ClearButton type="button" onClick={handleClearForm}>{textConstants.labels.clear}</ClearButton>
                </ButtonsContainer>
            </form>
        </FormContainer>
    );
};

export default TransactionForm;
