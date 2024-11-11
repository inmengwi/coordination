import React from 'react';
import LowestAndHighestPriceContainer from './container/LowestAndHighestPriceContainer';
import LowestPriceCategoriesContainer from './container/LowestPriceCategoriesContainer';
import LowestTotalAmountBrandContainer from "./container/LowestTotalAmountBrandContainer";

const App = () => {
  return (
      <div>
        <h2>카테고리별 최저가 보기</h2>
        <LowestPriceCategoriesContainer />

        <h2>모든 카테고리 합계 최저가 브랜드</h2>
        <LowestTotalAmountBrandContainer />

        <h2>카테고리 최저가/최고가 브랜드 보기</h2>
        <LowestAndHighestPriceContainer />
      </div>
  );
};

export default App;
