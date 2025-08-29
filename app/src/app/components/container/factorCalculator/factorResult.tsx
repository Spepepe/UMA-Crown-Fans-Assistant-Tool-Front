import React from 'react';
import { FactorResultProps } from '../../interface/props';

export const FactorResult: React.FC<FactorResultProps> = ({
  factorData,
  parentUmamusume,
  grandparentUmamusume,
  grandmotherUmamusume,
  distanceId,
  surfaceId,
  styleId,
}) => {
  // データが存在しない場合の処理
  if (!factorData?.data?.inheritance_factors) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">計算結果を読み込み中...</p>
      </div>
    );
  }

  const { grandparent_a, grandparent_b } = factorData.data.inheritance_factors;

  const getDistance = (distanceId: number): string => {
    const map: Record<number, string> = { 1: "短距離", 2: "マイル", 3: "中距離", 4: "長距離" };
    return map[distanceId] || "不明";
  };

  const getSurface = (surfaceId: number): string => {
    const map: Record<number, string> = { 1: "芝", 2: "ダート" };
    return map[surfaceId] || "不明";
  };

  const getStyle = (styleId: number): string => {
    const map: Record<number, string> = { 1: "逃げ", 2: "先行", 3: "差し", 4: "追込" };
    return map[styleId] || "不明";
  };

  const distance = getDistance(distanceId);
  const surface = getSurface(surfaceId);
  const style = getStyle(styleId);

  // 色を取得する関数
  const getColorClass = (value: string): string => {
    const colorMap: Record<string, string> = {
      // 芝・ダート
      "芝": "bg-green-500 text-white",
      "ダート": "bg-red-800 text-white",
      // 距離
      "短距離": "bg-pink-500 text-white",
      "マイル": "bg-lime-500 text-black",
      "中距離": "bg-yellow-500 text-black",
      "長距離": "bg-blue-500 text-white",
      // 脚質
      "逃げ": "bg-emerald-500 text-white",
      "先行": "bg-cyan-400 text-black",
      "差し": "bg-purple-500 text-white",
      "追込": "bg-orange-500 text-white"
    };
    return colorMap[value] || "bg-gray-200 text-black";
  };

  // 因子の値に基づいて適切な色を取得する関数
  const getFactorColorClass = (value: string): string => {
    if (!value || value === 'データなし') return "bg-gray-200 text-black";

    const lowerValue = value.toLowerCase();

    if (lowerValue.includes('芝') || lowerValue.includes('turf')) {
      return "bg-green-500 text-white";
    }
    if (lowerValue.includes('ダート') || lowerValue.includes('dirt')) {
      return "bg-red-800 text-white";
    }

    if (lowerValue.includes('短距離') || lowerValue.includes('sprint')) {
      return "bg-pink-500 text-white";
    }
    if (lowerValue.includes('マイル') || lowerValue.includes('mile')) {
      return "bg-lime-500 text-black";
    }
    if (lowerValue.includes('中距離') || lowerValue.includes('middle')) {
      return "bg-yellow-500 text-black";
    }
    if (lowerValue.includes('長距離') || lowerValue.includes('long')) {
      return "bg-blue-500 text-white";
    }

    if (lowerValue.includes('逃げ') || lowerValue.includes('escape')) {
      return "bg-emerald-500 text-white";
    }
    if (lowerValue.includes('先行') || lowerValue.includes('leading')) {
      return "bg-cyan-400 text-black";
    }
    if (lowerValue.includes('差し') || lowerValue.includes('insert')) {
      return "bg-purple-500 text-white";
    }
    if (lowerValue.includes('追込') || lowerValue.includes('tracking')) {
      return "bg-orange-500 text-white";
    }

    return "bg-gray-400 text-white";
  };

  return (
    // Added font-mochiy-pop class for the cute font
    <div className="font-mochiy-pop">
      
      {/* 計算結果の血統図 */}
      <div className="">

        <div className="relative flex justify-center items-center overflow-x-auto min-h-[800px]">

          {/* 親 */}
          <div className="flex flex-col justify-center items-center relative z-20 mr-12">
            <div className={`w-72 h-72 border-4 border-black rounded-lg flex flex-col justify-center items-center p-4 shadow-lg ${getColorClass(distance)}`}>
              <span className="font-bold text-xl text-center mb-3">{parentUmamusume?.umamusume_name}</span>
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-3"
                style={{
                  backgroundImage: `url(/image/umamusumeData/${parentUmamusume?.umamusume_name}.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
              </div>
              <div className="px-4 py-2 rounded text-base font-semibold">
                {distance}☆☆☆
              </div>
            </div>
          </div>

          {/* 祖父母 */}
          <div className="flex flex-col justify-around space-y-48 relative mr-12 z-20">
            <div className="relative">
              <div className={`w-64 h-56 border-4 border-black rounded-lg flex flex-col justify-center items-center p-4 shadow-lg ${getColorClass(distance)}`}>
                <span className="font-bold text-xl text-center mb-3">{grandparentUmamusume?.umamusume_name}</span>
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg mb-3"
                  style={{
                    backgroundImage: `url(image/umamusumeData/${grandparentUmamusume?.umamusume_name}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                </div>
                <div className="px-4 py-2 rounded text-base font-semibold">
                  {distance}☆☆☆
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`w-64 h-56 border-4 border-black rounded-lg flex flex-col justify-center items-center p-4 shadow-lg ${getColorClass(distance)}`}>
                <span className="font-bold text-xl text-center mb-3">{grandmotherUmamusume?.umamusume_name}</span>
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg mb-3"
                  style={{
                    backgroundImage: `url(/image/umamusumeData/${grandmotherUmamusume?.umamusume_name}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                </div>
                <div className="px-4 py-2 rounded text-base font-semibold">
                  {distance}☆☆☆
                </div>
              </div>
            </div>
          </div>

          {/* 祖祖父母 */}
          <div className="flex flex-col justify-around space-y-26 relative mr-12 z-20">
            <div className="relative">
              <div className={`w-48 h-24 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getColorClass(surface)}`}>
                <span className="text-sm font-semibold opacity-80 mb-1">祖父母AA</span>
                <span className="font-bold text-lg">
                  {surface}☆☆☆
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`w-48 h-24 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getColorClass(style)}`}>
                <span className="text-sm font-semibold opacity-80 mb-1">祖父母AB</span>
                <span className="font-bold text-lg">
                  {style}☆☆☆
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`w-48 h-24 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getColorClass(surface)}`}>
                <span className="text-sm font-semibold opacity-80 mb-1">祖父母BA</span>
                <span className="font-bold text-lg">
                  {surface}☆☆☆
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`w-48 h-24 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getColorClass(style)}`}>
                <span className="text-sm font-semibold opacity-80 mb-1">祖父母BB</span>
                <span className="font-bold text-lg">
                  {style}☆☆☆
                </span>
              </div>
            </div>
          </div>

          {/* 祖祖祖父母（計算結果を表示） */}
          <div className="flex flex-col justify-around space-y-6 relative z-20">
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_a?.aaa || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母AAA</span>
              <span className="font-bold text-sm">
                {grandparent_a?.aaa || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_a?.aab || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母AAB</span>
              <span className="font-bold text-sm">
                {grandparent_a?.aab || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_a?.aba || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母ABA</span>
              <span className="font-bold text-sm">
                {grandparent_a?.aba || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_a?.abb || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母ABB</span>
              <span className="font-bold text-sm">
                {grandparent_a?.abb || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_b?.baa || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母BAA</span>
              <span className="font-bold text-sm">
                {grandparent_b?.baa || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_b?.bab || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母BAB</span>
              <span className="font-bold text-sm">
                {grandparent_b?.bab || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_b?.bba || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母BBA</span>
              <span className="font-bold text-sm">
                {grandparent_b?.bba || 'データなし'} ☆☆☆
              </span>
            </div>
            <div className={`w-48 h-20 border-3 border-black rounded-lg flex flex-col justify-center items-center shadow-lg ${getFactorColorClass(grandparent_b?.bbb || 'データなし')}`}>
              <span className="text-sm font-semibold opacity-80 mb-1">祖父母BBB</span>
              <span className="font-bold text-sm">
                {grandparent_b?.bbb || 'データなし'} ☆☆☆
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};