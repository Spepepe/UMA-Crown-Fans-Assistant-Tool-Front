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
  },

  /** レースパターン情報取得
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param count カウント
   * @return any[] レースパターン情報
   */
  fetchRacePattern: async (token: string, umamusumeId: number, count: number): Promise<any[]> => {
    try {
      return await remainingRaceApi.fetchRacePattern(token, umamusumeId, count);
    } catch (error) {
      console.error("Failed to fetch race pattern:", error);
      return [];
    }
  }
};