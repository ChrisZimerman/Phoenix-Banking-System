import styled from "styled-components";

export const FormContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 24px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
    direction: rtl;
    font-family: "Heebo", sans-serif;
    text-align: center;
`;

export const Input = styled.input`
    width: calc(100% - 20px); 
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    text-align: right;
    margin: auto; 
    display: block; 

    &:focus {
        border-color: #003366;
        outline: none;
    }
`;


export const DateInput = styled(Input)`
    direction: ltr;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    text-align: right;
    display: block;
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    text-align: right;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px; 
    margin-top: 20px;
`;

export const Button = styled.button`
    background-color: #003366;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
    width: 45%; 
    min-width: 120px;

    &:hover {
        background-color: #002244;
    }
`;

export const ClearButton = styled(Button)`
    background-color: #f57c00;
    
    &:hover {
        background-color: #e65100;
    }
`;

export const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;
