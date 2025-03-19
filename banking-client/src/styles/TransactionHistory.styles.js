import styled from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 20px;
    direction: rtl; 
    font-family: "Heebo", sans-serif; 
`;

export const Title = styled.h2`
    text-align: center; 
    font-size: 22px;
    font-weight: bold;
    color: #003366;
    margin-bottom: 20px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff; /* לבן */
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Thead = styled.thead`
    background-color: #003366; 
    color: white;
`;

export const Th = styled.th`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
`;

export const Td = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
`;

export const ActionButton = styled.button`
    background-color: #003366; 
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin: 5px;
    transition: background 0.3s ease;

    &:hover {
        background-color: #002244; 
    }
`;

export const DeleteButton = styled(ActionButton)`
    background-color: #f57c00; 
    &:hover {
        background-color: #e65100; 
    }
`;
