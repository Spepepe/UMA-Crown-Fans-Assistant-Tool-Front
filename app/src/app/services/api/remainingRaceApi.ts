import { RemainingRace } from 'src';

// 残レース関連のAPI呼び出し
export const remainingRaceApi = {
  /** 残レース情報取得
   * @param token 認証トークン
   * @return RemainingRace[] 残レース情報
   */
  fetchRemainingRaces: async (token: string): Promise<RemainingRace[]> => {
    const response = await fetch("/api/race/remaining", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  },

  /** レースパターン情報取得
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param count カウント
   * @return any[] レースパターン情報
   */
  fetchRacePattern: async (token: string, umamusumeId: number, count: number): Promise<any[]> => {
    const response = await fetch("/api/race/pattern", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        umamusumeId: umamusumeId,
        count: count
      })
    });
    const responseJson = await response.json();
    return responseJson.data;
  }
};