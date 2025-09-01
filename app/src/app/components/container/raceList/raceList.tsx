import { useState, useEffect } from 'react';
import { Race } from '../../interface/interface';
import { RaceListHeader } from './raceListHeader';
import { RaceListData } from './raceListdata';
import { raceApi } from 'src';

// レース情報表示画面
export const RaceList = () => {
    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedState, setSelectedState] = useState<number>(-1);
    const [selectedDistance, setSelectedDistance] = useState<number>(-1);

    useEffect(() => {
      fetchRaces();
    }, []);

    useEffect(() => {
      fetchRaces();
    }, [selectedState, selectedDistance]);

    const fetchRaces = async (): Promise<void> => {
      try {
        const data = await raceApi.getRaceList(selectedState, selectedDistance);
        setRaces(data);
      } catch (error) {
        console.error("Failed to fetch races:", error);
        setRaces([]);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
        return <div className="min-h-full flex justify-center bg-Looding bg-cover"></div>
    }

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-gray-700 uppercase tracking-wider">馬場</label>
            <select
              className="border-2 border-gray-300 rounded-lg p-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedState}
              onChange={(e) => setSelectedState(Number(e.target.value))}
            >
              <option value={-1}>全て</option>
              <option value={0}>芝</option>
              <option value={1}>ダート</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-gray-700 uppercase tracking-wider">距離</label>
            <select
              className="border-2 border-gray-300 rounded-lg p-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(Number(e.target.value))}
            >
              <option value={-1}>全て</option>
              <option value={1}>短距離</option>
              <option value={2}>マイル</option>
              <option value={3}>中距離</option>
              <option value={4}>長距離</option>
            </select>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <RaceListHeader />
          <tbody>
            {races?.map((race) => (
              <RaceListData race={race} key={race.race_id} />
            ))}
          </tbody>
        </table>
      </div>
    );
};
