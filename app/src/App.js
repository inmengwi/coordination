import React from 'react';
import HighestAndLowestByCategory from './container/HighestAndLowestByCategory';
import LowestPriceGrid from './container/LowestPriceGrid';
import LowestTotalAmountBrand from "./container/LowestTotalAmountBrand";

const categories = new Map([
  ['top', '상의'],
  ['outer', '아우터'],
  ['pants', '바지'],
  ['sneakers', '스니커즈'],
  ['bag', '가방'],
  ['hat', '모자'],
  ['socks', '양말'],
  ['accessories', '악세서리'],
]);

const App = () => {

  return (
      <div>
        <h2>카테고리별 최저가 보기</h2>
        <LowestPriceGrid categories={categories}/>

        <h2>모든 카테고리 합계 최저가 브랜드</h2>
        <LowestTotalAmountBrand />

        <h2>카테고리 최저가/최고가 브랜드 보기</h2>
        <HighestAndLowestByCategory categories={categories}/>
      </div>
  );
};

export default App;
