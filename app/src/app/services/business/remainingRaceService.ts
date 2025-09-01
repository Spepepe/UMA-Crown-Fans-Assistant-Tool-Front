import { RemainingRace } from 'src';
import { remainingRaceApi } from '../api/remainingRaceApi';

// 残レース関連のサービス関数
export const remainingRaceService = {
  /** 残レース情報取得
   * @param token 認証トークン
   * @return RemainingRace[] 残レース情報
   */
  fetchRemainingRaces: async (token: string): Promise<RemainingRace[]> => {
    try {
      return await remainingRaceApi.fetchRemainingRaces(token);
    } catch (error) {
      console.error("Failed to fetch races:", error);
      return [];
    }
  }
};