import React from 'react';

const CatalogItemTable = ({ catalogItem }) => {
    if (catalogItem.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>브랜드</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>가격</th>
                </tr>
                </thead>
                <tbody>
                {catalogItem.map((item, index) => (
                    <tr key={index}>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.brand}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                            {item.price.toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CatalogItemTable;
