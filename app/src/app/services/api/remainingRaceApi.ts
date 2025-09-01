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
  }
};