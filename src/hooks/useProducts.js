import { useState } from "react";

export const useProducts = () => {
    // Start with empty array - products are optional
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({});
    const [activeProductKeys, setActiveProductKeys] = useState([]);

    const addProduct = () => {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 0;
        const updatedProducts = [...products, { id: newId }];
        setProducts(updatedProducts);
        setActiveProductKeys([...activeProductKeys, newId.toString()]);
    };

    const removeProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
        const newProductData = { ...productData };
        delete newProductData[id];
        setProductData(newProductData);
        setActiveProductKeys(activeProductKeys.filter(key => key !== id.toString()));
    };

    const updateProductField = (productId, fieldName, value) => {
        const updatedData = {
            ...productData,
            [productId]: {
                ...productData[productId],
                [fieldName]: value
            }
        };
        setProductData(updatedData);
    };

    const getAllProductsData = () => {
        return products.map(p => productData[p.id] || {});
    };

    const resetProducts = () => {
        setProducts([]);
        setProductData({});
        setActiveProductKeys([]);
    };

    return {
        products,
        productData,
        activeProductKeys,
        addProduct,
        removeProduct,
        updateProductField,
        getAllProductsData,
        resetProducts,
        setActiveProductKeys,
        setProducts,
        setProductData
    };
};
