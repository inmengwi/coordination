import React, {useEffect, useState} from 'react';
import axios from "axios";

const LowestTotalAmountBrand = ({ categories }) => {
    const [lowestPriceCatalog, setLowestPriceCatalog] = useState(null);

    const fetchLowestBrandCatalog = async () => {
        try {
            const response = await axios.get('http://localhost:8080/coordination/find-lowest-brand', {
                headers: { 'Content-Type': 'application/json' }
            });
            setLowestPriceCatalog(response.data);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        fetchLowestBrandCatalog()
    }, [])

    return (
        <div>
            {lowestPriceCatalog && (
                <div>
                    <p>브랜드: {lowestPriceCatalog.brand}</p>
                </div>
            )}
        </div>
    );
};

export default LowestTotalAmountBrand;
