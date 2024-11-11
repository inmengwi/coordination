// LowestPriceGrid.js
import React, {useEffect, useState} from 'react';
import axios from "axios";

const LowestPriceGrid = ({ categories }) => {
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

    const totalLowestPrice = Object.values(lowestPrices).reduce(
        (sum, item) => sum + item.price,
        0
    );

    useEffect(() => {
        fetchCatalogData()
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>카테고리</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>브랜드</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>가격</th>
                </tr>
                </thead>
                <tbody>
                {lowestPrices.map(catalogItem => (
                    <tr key={catalogItem.category}>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{categories.get(catalogItem.category)}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{catalogItem.brand}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                            {catalogItem.price}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="2" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                        총액
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                        {totalLowestPrice.toLocaleString()} 원
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LowestPriceGrid;
