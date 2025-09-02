import { useState, useEffect } from 'react';
import { Umamusume, RemainingRace } from '../../interface/interface';
import { RemainingRaceListHeader } from './remainingRaceListHeader';
import { RemainingRaceListData } from './remainingRaceListData';
import { RemainingRaceListManual } from "./remainingRaceListManual";
import { RemainingRaceListProps } from '../../interface/props';
import { remainingRaceService } from 'src';

//残レース情報表示画面
export const RemainingRaceList : React.FC<RemainingRaceListProps> = ({token})  => {
    
    //残レース情報を格納する配列
    const [remainingRaces, setRemainingRaces] = useState<RemainingRace[]>([]);
    
    //ローディング画面
    const [loading, setLoading] = useState<boolean>(true);
    
    //選択したウマ娘情報を格納する
    const [selectUmamusume, setSelectUmamusume] = useState<Umamusume | undefined>(undefined);
    
    //レース出走処理画面の表示有無
    const [isManualRaces, setIsManualRaces] = useState<boolean>(false);

    useEffect(() => {
      fetchRaces();
    }, []);

    //残レース情報を取得する
    const fetchRaces = async (): Promise<void> => {
      try {
        if (!token) {
          console.error('トークンが見つかりません');
          return;
        }
        const data = await remainingRaceService.fetchRemainingRaces(token);
        setRemainingRaces(data);
      } catch (error) {
        console.error("Failed to fetch races:", error);
      } finally {
        setLoading(false);
      }
    }

    //出走を行う処理
    const openCheckRaces = (umamusume: Umamusume): void => {
      setSelectUmamusume(umamusume);
      setIsManualRaces(true);
    };

    //戻るボタンを押下した処理
    const returnCheckRaces = (): void => {
      fetchRaces();
      setIsManualRaces(false);
    }

    if (loading) {
      return <div className="min-h-full flex justify-center bg-cover"></div>
    }
    
    if (isManualRaces) {
      return <RemainingRaceListManual umamusume={selectUmamusume} token={token} onReturn={returnCheckRaces}></RemainingRaceListManual>
    }

    return (
      <table className="table-fixed w-full border-collapse border border-gray-300">
        <thead className="sticky top-0 bg-white z-10">
          <th colSpan={2} className="border border-gray-300 px-2 py-2">処理</th>
          <th colSpan={3} className="border border-gray-300 px-2 py-2">情報</th>
          <th colSpan={4} className="border border-gray-300 px-2 py-2 bg-green-400">芝</th>
          <th colSpan={3} className="border border-gray-300 px-2 py-2 bg-red-400">ダート</th>
        </thead>
        <RemainingRaceListHeader></RemainingRaceListHeader>
        <tbody>
          {remainingRaces.map((remainingRace) => (
            <RemainingRaceListData key={remainingRace.umamusume.umamusume_id} remainingRace={remainingRace} checkRaces={() => openCheckRaces(remainingRace.umamusume)} />
          ))}
        </tbody>
      </table>
    );
};
