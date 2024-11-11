import React, { useState } from 'react';
import LowestAndHighestPriceContainer from './container/LowestAndHighestPriceContainer';
import LowestPriceCategoriesContainer from './container/LowestPriceCategoriesContainer';
import LowestTotalAmountBrandContainer from "./container/LowestTotalAmountBrandContainer";
import FunctionTab from "./components/FunctionTab";
import CatalogContainer from "./container/CatalogContainer";

const App = () => {
    // 현재 선택된 탭을 상태로 관리
    const [activeTab, setActiveTab] = useState(1);

    // 탭 클릭 시 상태 업데이트
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // 선택된 탭에 따라 렌더링할 컨테이너 설정
    const renderContent = () => {
        switch (activeTab) {
            case 1: return <LowestPriceCategoriesContainer />;
            case 2: return <LowestTotalAmountBrandContainer />;
            case 3: return <LowestAndHighestPriceContainer />;
            case 4: return <CatalogContainer />;
            default: return null;
        }
    };

    return (
        <div>
            <div style={{display: 'flex', cursor: 'pointer'}}>
                <FunctionTab index={1} activeTab={ activeTab } functionName={ "1. 카테고리별 최저가" } onTabClick={ handleTabClick } />
                <FunctionTab index={2} activeTab={ activeTab } functionName={ "2. 총합 최저가 브랜드" } onTabClick={ handleTabClick } />
                <FunctionTab index={3} activeTab={ activeTab } functionName={ "3. 카테고리 최저/최고 브랜드 검색" } onTabClick={ handleTabClick } />
                <FunctionTab index={4} activeTab={ activeTab } functionName={ "4. 브랜드 카탈로그 관리" } onTabClick={ handleTabClick } />
            </div>

            {/* 선택된 탭에 따른 컨텐츠 표시 */}
            <div style={{marginTop: '20px'}}>
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
