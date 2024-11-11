import React, { useState } from 'react';
import axios from "axios";
import SelectCategory from "../components/SelectCategory";

const SelectCategoryContainer = ( { onDataFetched }) => {
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
        <div>
            <SelectCategory
                selectedCategory={ selectedCategory }
                handleChange={ handleChange }
            />
            {loading && <p>데이터를 불러오는 중...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
};

export default SelectCategoryContainer;