import { RemainingRace, Umamusume, RaceEntryPattern } from 'src';
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

  /** レース出走推奨パターン取得
   * @param token 認証トークン
   * @param umamusume ウマ娘情報
   * @return RaceEntryPattern 推奨パターン
   */
  fetchEntryPattern: async (token: string, umamusume: Umamusume): Promise<RaceEntryPattern | undefined> => {
    try {
      if (!token) {
        console.error('トークンが見つかりません');
        return undefined;
      }
      return await remainingRaceApi.fetchEntryPattern(token, umamusume.umamusume_id);
    } catch (error) {
      console.error("Failed to fetch races:", error);
      return undefined;
    }
  }
};