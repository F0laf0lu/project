import { useState } from "react";



export const useDirectors = ()=>{

    const [directors, setDirectors] = useState([{ id: 0 }]);
    const [directorData, setDirectorData] = useState({});
    const [activeDirectorKeys, setActiveDirectorKeys] = useState(['0']);

    const adddirector = () => {
        const newId = directors.length > 0 ? Math.max(...directors.map(b => b.id)) + 1 : 0;
        const updatedDirectors = [...directors, { id: newId }];
        setDirectors(updatedDirectors);
        setActiveDirectorKeys([...activeDirectorKeys, newId.toString()]);
    };

    const removeDirector = (id) => {
        setDirectors(directors.filter(b => b.id !== id));
        const newdirectorData = { ...directorData };
        delete newdirectorData[id];
        setDirectorData(newdirectorData);
        setActiveDirectorKeys(activeDirectorKeys.filter(key => key !== id.toString()));
    };


    const updateDirectorField = (directorId, fieldName, value) => {
        // Use functional form to avoid stale state when multiple updates happen quickly
        setDirectorData(prevData => ({
            ...prevData,
            [directorId]: {
                ...prevData[directorId],
                [fieldName]: value
            }
        }));
    };

    const getAllDirectorsData = () => {
        return directors.map(b => directorData[b.id] || {});
    };

    const resetDirectors = () => {
        setDirectors([{ id: 0 }]);
        setDirectorData({});
        setActiveKeys(['0']);
    };


    return {
        directors,
        directorData,
        activeDirectorKeys,
        adddirector,
        removeDirector,
        updateDirectorField,
        getAllDirectorsData,
        resetDirectors,
        setActiveDirectorKeys,
        setDirectors,
        setDirectorData
    };
};
