import { Live, Umamusume } from 'src';
import { liveApi } from '../api/liveApi';

// ライブ関連のサービス関数
export const liveService = {
  /** ライブ情報取得
   * @return Live[] ライブ情報
   */
  fetchLives: async (): Promise<Live[]> => {
    try {
      return await liveApi.fetchLives();
    } catch (error) {
      console.error("Failed to fetch lives:", error);
      return [];
    }
  },

  /** ライブに紐づくウマ娘取得
   * @param token 認証トークン
   * @param live ライブ情報
   * @return Umamusume[] ウマ娘情報
   */
  fetchLiveUmamusumes: async (token: string, live: Live): Promise<Umamusume[]> => {
    try {
      if (!token) {
        console.error('トークンが見つかりません');
        return [];
      }
      return await liveApi.fetchLiveUmamusumes(token, live.live_id);
    } catch (error) {
      console.error("Failed to fetch lives:", error);
      return [];
    }
  }
};