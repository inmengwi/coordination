import React, {useEffect, useState} from 'react';
import axios from "axios";
import CatalogItemTable from "../components/CatalogItemTable";

const LowestPriceCategoriesContainer = () => {
    const [lowestPrices, setLowestPrices] = useState([]);

    const fetchCatalogData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/coordination/find-lowest-category-item', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setLowestPrices(response.data);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        fetchCatalogData()
    }, [])

    return <CatalogItemTable catalogItems={ lowestPrices } isNeedSum={ true } />
};

export default LowestPriceCategoriesContainer;
