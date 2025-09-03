import { useState } from 'react';
import React from 'react';

interface RemainingRaceListPatternProps {
  racePattern?: any;
  selectUmamusume?: any;
  onReturn?: () => void;
}

export const RemainingRaceListPattern: React.FC<RemainingRaceListPatternProps> = ({ racePattern, selectUmamusume, onReturn }) => {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('クラシック級');
  
  const patterns = racePattern?.patterns || racePattern || [];
  const currentPattern = patterns[selectedPattern];
  const umamusumeName = selectUmamusume?.umamusume_name || '';
  
  console.log('racePattern:', racePattern);
  console.log('currentPattern:', currentPattern);
  console.log('umamusumeName:', umamusumeName);
  
  const getFactorStars = (factors: string[]) => {
    const factorCount = {};
    factors.forEach(factor => {
      factorCount[factor] = (factorCount[factor] || 0) + 1;
    });
    
    return Object.entries(factorCount).map(([factor, count]) => ({
      name: factor,
      stars: '☆'.repeat(count)
    }));
  };
  

  const months = [
    { month: '1月', firstHalf: '1月 前半', secondHalf: '1月 後半' },
    { month: '2月', firstHalf: '2月 前半', secondHalf: '2月 後半' },
    { month: '3月', firstHalf: '3月 前半', secondHalf: '3月 後半' },
    { month: '4月', firstHalf: '4月 前半', secondHalf: '4月 後半' },
    { month: '5月', firstHalf: '5月 前半', secondHalf: '5月 後半' },
    { month: '6月', firstHalf: '6月 前半', secondHalf: '6月 後半' },
    { month: '7月', firstHalf: '7月 前半', secondHalf: '7月 後半' },
    { month: '8月', firstHalf: '8月 前半', secondHalf: '8月 後半' },
    { month: '9月', firstHalf: '9月 前半', secondHalf: '9月 後半' },
    { month: '10月', firstHalf: '10月 前半', secondHalf: '10月 後半' },
    { month: '11月', firstHalf: '11月 前半', secondHalf: '11月 後半' },
    { month: '12月', firstHalf: '12月 前半', secondHalf: '12月 後半' },
  ];

  const getCardStyle = () => {
    return 'bg-gray-400 hover:bg-gray-500 cursor-pointer';
  };

  const getRaceForSlot = (monthIndex: number, half: 'first' | 'second') => {
    if (!currentPattern) return null;
    
    const categoryKey = selectedCategory === 'ジュニア級' ? 'junior' : 
                       selectedCategory === 'クラシック級' ? 'classic' : 'senior';
    const races = currentPattern[categoryKey];
    
    if (!races) return null;
    
    const targetMonth = monthIndex + 1;
    const targetHalf = half === 'first' ? 0 : 1;
    
    return races.find(race => race.month === targetMonth && race.half === targetHalf);
  };

  const renderCard = (monthIndex: number, half: 'first' | 'second', label: string) => {
    const cardStyle = getCardStyle();
    const raceData = getRaceForSlot(monthIndex, half);
    const raceName = raceData?.race_name || '';
    
    return (
      <div className="flex flex-col items-center relative pb-3">
        <div
          key={`${monthIndex}-${half}`}
          className={`w-32 h-20 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${cardStyle}`}
          style={{
            backgroundImage: raceName ? `url(/image/raceData/${raceName}.png)` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {raceName ? (
            <>
              <img 
                src={`/image/raceData/${raceName}.png`}
                alt={raceName}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-white text-xs font-bold text-center px-1" style={{ display: 'none' }}>
                {raceName}
              </div>
            </>
          ) : (
            <div className="text-green-500 text-2xl font-bold">+</div>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-700 font-medium">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-4">
      {/* タイトル */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-purple-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          レースパターンシミュレーション機能
        </h1>
      </div>
      
      <div className="max-w-6xl mx-auto bg-gray-100">
        <div className="flex">
        {/* 左側: ウマ娘情報と因子 */}
        <div className="w-1/3 p-4 space-y-4">
        {/* ウマ娘情報 */}
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="text-xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {umamusumeName}
          </div>
          <div className="w-32 h-32 mx-auto" 
               style={{ 
                 backgroundImage: umamusumeName ? `url(/image/umamusumeData/${umamusumeName}.png)` : 'none', 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
          </div>
        </div>
        
        {/* 選択シナリオ */}
        {currentPattern?.scenario && (
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>選択シナリオ</div>
            <div className="text-gray-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{currentPattern.scenario}</div>
          </div>
        )}
        
        {/* 必要因子 */}
        {currentPattern?.factors && (
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>必要因子</div>
            {currentPattern.factors.map((factor, index) => (
              <div key={index} className="mb-1">
                <span className="font-medium" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{factor}</span>
                <span className="text-yellow-500 ml-2">★★★</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 右側: パターン選択とレースグリッド */}
      <div className="w-2/3 p-4">
        {/* パターン選択 */}
        {patterns.length > 0 && (
          <div className="bg-white flex rounded-full mb-4 p-1">
            {patterns.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedPattern(index)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  selectedPattern === index
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
{index + 1}回目
              </button>
            ))}
          </div>
        )}
        
        {/* タブメニュー */}
        <div className="bg-white flex rounded-full mb-6 p-1">
          {['ジュニア級', 'クラシック級', 'シニア級'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* レースグリッド */}
        <div className="grid grid-cols-4 gap-x-2 gap-y-2">
          {months.map((monthData, index) => (
            <React.Fragment key={monthData.month}>
              {/* 前半 */}
              {renderCard(index, 'first', monthData.firstHalf)}
              {/* 後半 */}
              {renderCard(index, 'second', monthData.secondHalf)}
            </React.Fragment>
          ))}
        </div>
        </div>
        </div>
      </div>
      
      {/* 戻るボタン */}
      <div className="w-full text-center mt-4 pb-4">
        <button
          onClick={onReturn}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default RemainingRaceListPattern;