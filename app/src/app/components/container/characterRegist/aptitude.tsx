import React from 'react';
import { AptitudeProps } from '../../interface/props';
export const Aptitude : React.FC<AptitudeProps> = ({ name , aptitude })=> {

    //適性にそってテキストの色を変更する
    const getAptitudeColor = (aptitude: string) => {
        switch (aptitude) {
          case 'A':
            return 'text-red-500'; // 赤
          case 'B':
            return 'text-pink-400'; // 若干ピンクの赤
          case 'C':
            return 'text-green-500'; // 緑
          case 'D':
            return 'text-cyan-400'; // 水色
          case 'E':
            return 'text-purple-500'; // 紫
          case 'F':
            return 'text-blueGray-400'; // 若干青い灰色
          case 'G':
            return 'text-gray-500'; // 灰色
          default:
            return 'text-black'; // デフォルト
        }
      };

return (
  <div className="flex flex-col items-center p-4 bg-gradient-to-b from-green-400 to-green-100 shadow-lg rounded-lg transition transform hover:scale-105 w-1/12 h-full md-h-5/6 max-w-xs max-h-xs">
    <div className="font-poppins text-xs font-semibold whitespace-nowrap">{name}</div>
    <div className={`text-base sm:text-lg md:text-2xl ${getAptitudeColor(aptitude)} font-semibold`}>
      {aptitude}
    </div>
  </div>
  );
};
