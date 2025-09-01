import { RegistUmamusume } from 'src';
import { characterApi } from '../api/characterApi';

// キャラクターリスト用サービス関数
export const characterListService = {
  /** ユーザー登録済みウマ娘取得
   * @param token 認証トークン
   * @return RegistUmamusume[] 登録済みウマ娘リスト
   */
  fetchUmamusumes: async (token: string): Promise<RegistUmamusume[]> => {
    try {
      return await characterApi.getUserRegisteredCharacters(token);
    } catch (error) {
      console.error("Failed to fetch races:", error);
      return [];
    }
  },

  /** ファン数更新
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param fans ファン数
   * @return void
   */
  updateFanCount: async (token: string, umamusumeId: number, fans: number): Promise<void> => {
    await characterApi.updateFanCount(token, umamusumeId, fans);
  }
};