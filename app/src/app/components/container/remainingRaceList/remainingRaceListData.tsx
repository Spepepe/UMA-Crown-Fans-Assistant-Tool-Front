import React from 'react';
import { TdItem } from '../../common/tdItem';
import { RemainingRaceListDataProps } from '../../interface/props';

//声優情報表示画面のレコード情報を定義する
export const RemainingRaceListData: React.FC<RemainingRaceListDataProps> = ({ remainingRace , checkRaces }) => {

    //出走画面表示処理を親へ通知する
    const handleClick = () => {
        checkRaces(remainingRace.umamusume);
    };

    return (
        <tr>
            <td className="border border-gray-500 px-4 py-2 text-center text-black font-semibold w-20" style={{ fontSize: 'clamp(1rem, 1.5vw, 0.25rem)' , whiteSpace: 'nowrap', width: '80px'}}>
                {remainingRace.isAllCrown ? (
                    <span>全冠</span>
                ) : (
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
                    >
                        出走
                    </button>
                )}
            </td>
            <td className="border border-gray-500 px-4 py-2 text-center text-black font-semibold w-20" style={{ fontSize: 'clamp(1rem, 1.5vw, 0.25rem)' , whiteSpace: 'nowrap', width: '80px'}}>
                {remainingRace.isAllCrown ? (
                    <span>全冠</span>
                ) : (
                    <button
                        onClick={handleClick}
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
                    >
                        パターン
                    </button>
                )}
            </td>
            <td className="border border-gray-500 px-1 py-4 h-32 w-24" 
                style={{ height: '120px', width: '96px' }}>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 mb-1" 
                         style={{ 
                             backgroundImage: `url(/image/umamusumeData/${remainingRace.umamusume.umamusume_name}.png)`, 
                             backgroundSize: 'cover', 
                             backgroundPosition: 'center',
                             backgroundRepeat: 'no-repeat'
                         }}>
                    </div>
                    <div className="text-center text-pink-600 font-bold" 
                         style={{ 
                             fontSize: '0.6rem', 
                             whiteSpace: 'nowrap',
                             fontFamily: 'Comic Sans MS, cursive',
                             textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                         }}>
                        {remainingRace.umamusume.umamusume_name}
                    </div>
                </div>
            </td>
            <TdItem content=
            {remainingRace.breedingCount.toString()}
            />
            <TdItem content=
                    {remainingRace.isAllCrown ? '全冠' : remainingRace.allCrownRace.toString()}
            />
            <TdItem content=
                    {remainingRace.turfSprintRace.toString()}
            />
            <TdItem content=
                    {remainingRace.turfMileRace.toString()}
            />
            <TdItem content=
                    {remainingRace.turfClassicRace.toString()}
            />
            <TdItem content=
                    {remainingRace.turfLongDistanceRace.toString()}
            />
            <TdItem content=
                    {remainingRace.dirtSprintDistanceRace.toString()}
            />
            <TdItem content=
                    {remainingRace.dirtMileRace.toString()}
            />
            <TdItem content=
                    {remainingRace.dirtClassicRace.toString()}
            />
        </tr>
    );
};
