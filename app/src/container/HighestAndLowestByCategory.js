import React, {useState} from "react";
import SelectCategory from "./SelectCategory";
import CatalogItemTable from "./CatalogItemTable";
import axios from "axios";

const HighestAndLowestByCategory = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [highestByCategory, setHighestByCategory] = useState(null);
    const [lowestByCategory, setLowestByCategory] = useState(null);

    // 특정 카테고리 선택 핸들러
    const handleCategorySelect = async (highestAndLowestData) => {
        setSelectedCategory(highestAndLowestData.category);
        setLowestByCategory(highestAndLowestData.lowests);
        setHighestByCategory(highestAndLowestData.highests);
    };

    return (
        <div>
            <SelectCategory categories={categories} onDataFetched={handleCategorySelect}/>
            {selectedCategory && (
                <div>
                    <p>선택한 카테고리: {categories.get(selectedCategory)}</p>

                    최저가
                    <CatalogItemTable data={ lowestByCategory }></CatalogItemTable>

                    최고가
                    <CatalogItemTable data={ highestByCategory }></CatalogItemTable>
                </div>
            )}
        </div>
    );
}

export default HighestAndLowestByCategory;