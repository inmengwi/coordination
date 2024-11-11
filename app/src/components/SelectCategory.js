import React from "react";
import { Categories } from "../data/consts"

const SelectCategory = ({ selectedCategory, handleChange }) => {
    return (
        <div style={{padding: '20px'}}>
            <label htmlFor="category-select">카테고리 선택: </label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={handleChange}
                style={{padding: '5px', fontSize: '16px'}}
            >
                <option value="">카테고리 선택</option>
                {Array.from(Categories).map(([key, name]) => (
                    <option key={key} value={key}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectCategory;