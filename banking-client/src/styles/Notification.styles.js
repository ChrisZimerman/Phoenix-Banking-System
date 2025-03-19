import styled from "styled-components";

export const NotificationContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 15px auto;
    padding: 10px 16px;
    font-size: 14px; 
    font-weight: bold;
    text-align: center;
    border-radius: 6px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
    background: #ffffff;
    font-family: "Assistant", sans-serif; 
`;

export const ErrorMessage = styled(NotificationContainer)`
    background: rgba(211, 47, 47, 0.1); 
    color: #D32F2F;
    border: 1px solid #D32F2F; 
`;

export const SuccessMessage = styled(NotificationContainer)`
    background: #f0f0f0; 
    color: #003366;
    border: 1px solid #003366; 
`;
