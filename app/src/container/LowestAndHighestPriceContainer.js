import React, {useState} from "react";
import SelectCategoryContainer from "./SelectCategoryContainer";
import CatalogItemTable from "../components/CatalogItemTable";

const LowestAndHighestPriceContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [highestsByCategory, setHighestByCategory] = useState(null);
    const [lowestsByCategory, setLowestByCategory] = useState(null);

    // 특정 카테고리 선택 핸들러
    const handleCategorySelect = async (highestAndLowestData) => {
        setSelectedCategory(highestAndLowestData.category);
        setLowestByCategory(highestAndLowestData.lowests);
        setHighestByCategory(highestAndLowestData.highests);
    };

    return (
        <div>
            <SelectCategoryContainer onDataFetched={handleCategorySelect}/>
            {selectedCategory && (
                <div>
                    최저가
                    <CatalogItemTable catalogItems={ lowestsByCategory }></CatalogItemTable>

                    최고가
                    <CatalogItemTable catalogItems={ highestsByCategory }></CatalogItemTable>
                </div>
            )}
        </div>
    );
}

export default LowestAndHighestPriceContainer;