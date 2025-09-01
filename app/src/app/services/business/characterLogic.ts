import { Race } from 'src';

// キャラクター関連のビジネスロジック
export const characterLogic = {
  /** レースにチェック状態を追加
   * @param races レースリスト
   * @return Race[] チェック状態付きレースリスト
   */
  addCheckedStateToRaces: (races: Race[]): Race[] => {
    return races.map((race) => ({
      ...race,
      checked: false,
    }));
  },

  /** 全レース選択処理
   * @param races レースリスト
   * @return {updatedRaces: Race[], allRaceIds: number[]} 更新されたレースリストと全レースID
   */
  selectAllRaces: (races: Race[]): { updatedRaces: Race[], allRaceIds: number[] } => {
    const allRaceIds = races.map((race) => race.race_id);
    const updatedRaces = races.map((race) => ({ ...race, checked: true }));
    return { updatedRaces, allRaceIds };
  },

  /** チェックボックス変更処理
   * @param races レースリスト
   * @param registRace 登録レースIDリスト
   * @param raceId 対象レースID
   * @param checked チェック状態
   * @return {updatedRaces: Race[], updatedRegistRace: number[]} 更新されたレースリストと登録レースIDリスト
   */
  handleRaceCheckboxChange: (
    races: Race[],
    registRace: number[],
    raceId: number,
    checked: boolean
  ): { updatedRaces: Race[], updatedRegistRace: number[] } => {
    const updatedRegistRace = checked
      ? [...registRace, raceId]
      : registRace.filter((id) => id !== raceId);

    const updatedRaces = races.map((race) =>
      race.race_id === raceId ? { ...race, checked } : race
    );

    return { updatedRaces, updatedRegistRace };
  }
};