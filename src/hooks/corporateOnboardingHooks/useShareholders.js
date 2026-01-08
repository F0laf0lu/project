import { useState } from "react";



export const useShareholders = ()=>{

    const [shareholders, setShareholders] = useState([{ id: 0 }]);
    const [shareholderData, setShareholderData] = useState({});
    const [activeShareholderKeys, setActiveShareholderKeys] = useState(['0']);

    const addShareholder = () => {
        const newId = shareholders.length > 0 ? Math.max(...shareholders.map(b => b.id)) + 1 : 0;
        const updatedShareholders = [...shareholders, { id: newId }];
        setShareholders(updatedShareholders);
    setActiveShareholderKeys([...activeShareholderKeys, newId.toString()]);
    };

    const removeShareholder = (id) => {
        setShareholders(shareholders.filter(b => b.id !== id));
        const newShareholderData = { ...shareholderData };
        delete newShareholderData[id];
        setShareholderData(newShareholderData);
        setActiveShareholderKeys(activeShareholderKeys.filter(key => key !== id.toString()));
    };


    const updateShareholderField = (shareholderId, fieldName, value) => {
        // Use functional form to avoid stale state when multiple updates happen quickly
        setShareholderData(prevData => ({
            ...prevData,
            [shareholderId]: {
                ...prevData[shareholderId],
                [fieldName]: value
            }
        }));
    };

    const getAllShareholdersData = () => {
        return shareholders.map(b => shareholderData[b.id] || {});
    };

    const resetShareholders = () => {
        setShareholders([{ id: 0 }]);
        setShareholderData({});
        setActiveShareholderKeys(['0']);
    };


    return {
        shareholders,
        shareholderData,
        activeShareholderKeys,
        addShareholder,
        removeShareholder,
        updateShareholderField,
        getAllShareholdersData,
        resetShareholders,
        setActiveShareholderKeys,
        setShareholders,
        setShareholderData
    };
};
