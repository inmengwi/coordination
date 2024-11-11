// SelectCategory.js
import React, { useState } from 'react';
import axios from "axios";

const SelectCategory = ({ categories, onDataFetched }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category) {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post('http://localhost:8080/coordination/find-lowest-highest', category, {
                    headers: {
                        'Content-Type': 'text/plain',
                    }
                });

                onDataFetched(response.data);
            } catch (err) {
                setError('데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        } else {
            onDataFetched([]);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <label htmlFor="category-select">카테고리 선택: </label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={handleChange}
                style={{ padding: '5px', fontSize: '16px' }}
            >
                <option value="">카테고리 선택</option>
                {Array.from(categories).map(([key, name]) => (
                    <option key={key} value={key}>
                        {name}
                    </option>
                ))}
            </select>
            {loading && <p>데이터를 불러오는 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SelectCategory;