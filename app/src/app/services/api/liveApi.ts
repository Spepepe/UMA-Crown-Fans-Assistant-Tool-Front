import { Live, Umamusume } from 'src';

// ライブ関連のAPI呼び出し
export const liveApi = {
  /** ライブ情報取得
   * @return Live[] ライブ情報
   */
  fetchLives: async (): Promise<Live[]> => {
    const response = await fetch("/api/live/list");
    const responseJson = await response.json();
    return responseJson.data;
  },

  /** ライブに紐づくウマ娘取得
   * @param token 認証トークン
   * @param liveId ライブID
   * @return Umamusume[] ウマ娘情報
   */
  fetchLiveUmamusumes: async (token: string, liveId: number): Promise<Umamusume[]> => {
    const response = await fetch("/api/live/umamusume", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liveId }),
    });
    const responseJson = await response.json();
    return responseJson.data;
  }
};