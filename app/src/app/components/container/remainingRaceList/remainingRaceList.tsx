import { useState, useEffect } from 'react';
import { Umamusume, RemainingRace } from '../../interface/interface';
import { RemainingRaceListHeader } from './remainingRaceListHeader';
import { RemainingRaceListData } from './remainingRaceListData';
import { RemainingRaceListManual } from "./remainingRaceListManual";
import { RemainingRaceListProps } from '../../interface/props';
import { RemainingRaceListPattern } from './remainingRaceListPattern';
import { remainingRaceService } from 'src';

//残レース情報表示画面
export const RemainingRaceList : React.FC<RemainingRaceListProps> = ({token})  => {
    
    //残レース情報を格納する配列
    const [remainingRaces, setRemainingRaces] = useState<RemainingRace[]>([]);
    
    //ローディング画面
    const [loading, setLoading] = useState<boolean>(true);
    
    //選択したウマ娘情報を格納する
    const [selectUmamusume, setSelectUmamusume] = useState<Umamusume | undefined>(undefined);

    //レースパターン情報を格納する
    const [racePattern, setRacePattern] = useState<any[]>([]);
    
    //レース出走処理画面の表示有無
    const [isManualRaces, setIsManualRaces] = useState<boolean>(false);

    //レースパターン画面の表示有無
    const [isPattern, setIsPattern] = useState<boolean>(false);

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

    //レースパターン情報を取得する
    const fetchRacePattern = async ( umamusumeId: number , count : number ): Promise<void> => {
      try {
        if (!token) {
          console.error('トークンが見つかりません');
          return;
        }
        const data = await remainingRaceService.fetchRacePattern(token , umamusumeId , count);
        setRacePattern(data);
      } catch (error) {
        console.error("Failed to fetch race pattern:", error);
      }
    }

    //出走を行う処理
    const openCheckRaces = (umamusume: Umamusume): void => {
      setSelectUmamusume(umamusume);
      setIsManualRaces(true);
    };

    //レースパターン表示処理
    const openRacePattern = ( umamusume: Umamusume , count : number ) : void => {
      setSelectUmamusume(umamusume);
      fetchRacePattern(umamusume.umamusume_id, count);
      setIsPattern(true);
    };


    //戻るボタンを押下した処理
    const returnCheckRaces = (): void => {
      fetchRaces();
      setIsManualRaces(false);
    }

    //戻るボタンを押下した処理
    const returnRacePattern = (): void => {
      fetchRaces();
      setIsPattern(false);
    }

    if (loading) {
      return <div className="min-h-full flex justify-center bg-cover"></div>
    }
    
    if (isManualRaces) {
      return <RemainingRaceListManual umamusume={selectUmamusume} token={token} onReturn={returnCheckRaces}></RemainingRaceListManual>
    }

    if (isPattern) {
      return <RemainingRaceListPattern racePattern={racePattern} selectUmamusume={selectUmamusume} onReturn={returnRacePattern}></RemainingRaceListPattern>
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
          {remainingRaces && remainingRaces.map((remainingRace) => (
            <RemainingRaceListData key={remainingRace.umamusume.umamusume_id} remainingRace={remainingRace} checkRaces={() => openCheckRaces(remainingRace.umamusume)} getRacePattern={() => openRacePattern(remainingRace.umamusume, remainingRace.breedingCount)} />
          ))}
        </tbody>
      </table>
    );
};
