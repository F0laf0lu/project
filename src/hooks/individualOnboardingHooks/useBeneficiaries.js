import { useState } from "react";



export const useBeneficiaries = ()=>{

    const [beneficiaries, setBeneficiaries] = useState([{ id: 0 }]);
    const [beneficiaryData, setBeneficiaryData] = useState({});
    const [activeKeys, setActiveKeys] = useState(['0']);

    const addBeneficiary = () => {
        const newId = beneficiaries.length > 0 ? Math.max(...beneficiaries.map(b => b.id)) + 1 : 0;
        const updatedBeneficiaries = [...beneficiaries, { id: newId }];
        setBeneficiaries(updatedBeneficiaries);
        setActiveKeys([...activeKeys, newId.toString()]);
    };

    const removeBeneficiary = (id) => {
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
        const newBeneficiaryData = { ...beneficiaryData };
        delete newBeneficiaryData[id];
        setBeneficiaryData(newBeneficiaryData);
        setActiveKeys(activeKeys.filter(key => key !== id.toString()));
    };


    const updateBeneficiaryField = (beneficiaryId, fieldName, value) => {
        const updatedData = {
            ...beneficiaryData,
            [beneficiaryId]: {
                ...beneficiaryData[beneficiaryId],
                [fieldName]: value
            }
        };
        setBeneficiaryData(updatedData);
    };

    const getAllBeneficiariesData = () => {
      console.log(beneficiaryData)
        return beneficiaries.map(b => beneficiaryData[b.id] || {});
    };

    const resetBeneficiaries = () => {
        setBeneficiaries([{ id: 0 }]);
        setBeneficiaryData({});
        setActiveKeys(['0']);
    };


    return {
        beneficiaries,
        beneficiaryData,
        activeKeys,
        addBeneficiary,
        removeBeneficiary,
        updateBeneficiaryField,
        getAllBeneficiariesData,
        resetBeneficiaries,
        setActiveKeys,
        setBeneficiaries,
        setBeneficiaryData
    };
};
