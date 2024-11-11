import React from 'react';
import { Categories } from "../data/consts"

const CatalogItemTable = ({ catalogItems, isNeedSum }) => {
    if (catalogItems.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }

    function getTotalAmount() {
        return Object.values(catalogItems).reduce(
            (sum, item) => sum + item.price,
            0
        ).toLocaleString();
    }

    const tHead = catalogItems && catalogItems[0]

    let totalAmountSpan = 0
    if(tHead.category) totalAmountSpan ++
    if(tHead.brand) totalAmountSpan ++

    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    {tHead.category && (
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>카테고리</th>
                    )}
                    {tHead.brand && (
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>브랜드</th>
                    )}
                    {tHead.price && (
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>가격</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {catalogItems.map((item, index) => (
                    <tr key={index}>
                    {item.category && (
                        <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                            {Categories.get(item.category)}
                        </td>
                    )}
                    {item.brand && (
                        <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>{item.brand}</td>
                    )}
                    {item.price && (
                        <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                            {item.price.toLocaleString()}
                        </td>
                    )}
                    </tr>
                ))}
                {isNeedSum && (
                    <tr>
                        <td colSpan={totalAmountSpan}
                            style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>
                            총액
                        </td>
                        <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>
                            { getTotalAmount() } 원
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CatalogItemTable;
