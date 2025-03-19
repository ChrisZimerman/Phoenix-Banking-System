import styled from "styled-components";

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
    direction: rtl;
`;

export const Input = styled.input`
    width: 200px;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    text-align: right;
`;

export const Button = styled.button`
    background-color: #003366;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;

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
