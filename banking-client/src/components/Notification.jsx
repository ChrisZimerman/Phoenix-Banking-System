import React, { useEffect } from "react";
import { SuccessMessage, ErrorMessage } from "../styles/Notification.styles";

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose(); // 4 seconds later, the message will be removed
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return type === "success" ? (
        <SuccessMessage>{message}</SuccessMessage>
    ) : (
        <ErrorMessage>{message}</ErrorMessage>
    );
};

export default Notification;
