import { useState, useEffect } from 'react';
import { Race, raceApi } from 'src';

/** レースリスト用カスタムフック
 * @return レースリスト関連の状態と関数
 */
export const useRaceList = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedState, setSelectedState] = useState<number>(-1);
  const [selectedDistance, setSelectedDistance] = useState<number>(-1);

  /** レースリスト取得
   * @return void
   */
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

  useEffect(() => {
    fetchRaces();
  }, []);

  useEffect(() => {
    fetchRaces();
  }, [selectedState, selectedDistance]);

  return {
    races,
    loading,
    selectedState,
    setSelectedState,
    selectedDistance,
    setSelectedDistance
  };
};