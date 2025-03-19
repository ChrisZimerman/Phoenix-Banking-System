import React, { useState } from "react";
import { FilterContainer, Input, Button, ClearButton } from "../styles/TransactionFilter.styles";

const TransactionFilter = ({ onFilter }) => {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");

    const handleFilter = () => {
        onFilter(searchId, searchName);
    };

    const handleClear = () => {
        setSearchId("");
        setSearchName("");
        onFilter("", ""); 
    };

    return (
        <FilterContainer>
            <Input
                type="text"
                placeholder="חפש לפי תעודת זהות"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <Input
                type="text"
                placeholder="חפש לפי שם מלא בעברית"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <Button onClick={handleFilter}>חפש</Button>
            <ClearButton onClick={handleClear}>נקה</ClearButton> 
        </FilterContainer>
    );
};

export default TransactionFilter;
