import { Race, Umamusume, characterApi, raceApi, characterLogic } from 'src';

// キャラクター登録用サービス関数
export const characterRegistService = {
  /** 登録可能ウマ娘取得
   * @param token 認証トークン
   * @return Umamusume[] ウマ娘リスト
   */
  fetchUmamusumes: async (token: string): Promise<Umamusume[]> => {
    try {
      return await characterApi.getRegistrableCharacters(token);
    } catch (error) {
      console.error("Failed to fetch umamusumes:", error);
      return [];
    }
  },

  /** 登録可能レース取得
   * @param token 認証トークン
   * @return Race[] レースリスト
   */
  fetchRaces: async (token: string): Promise<Race[]> => {
    try {
      const data = await raceApi.getRegistrableRaces(token);
      return characterLogic.addCheckedStateToRaces(data);
    } catch (error) {
      console.error("Failed to fetch races:", error);
      return [];
    }
  },

  /** ウマ娘登録処理
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param raceIds レースIDリスト
   * @param fans ファン数
   * @return any 登録結果
   */
  registerCharacter: async (token: string, umamusumeId: number, raceIds: number[], fans: number): Promise<any> => {
    return await characterApi.registerCharacter(token, umamusumeId, raceIds, fans);
  }
};