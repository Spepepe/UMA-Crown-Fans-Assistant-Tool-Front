import { Race } from 'src';

// レース関連のAPI呼び出し
export const raceApi = {
  // レースリスト取得
  // @param state 馬場状態
  // @param distance 距離
  // @return Race[] レースリスト
  getRaceList: async (state: number, distance: number): Promise<Race[]> => {
    const response = await fetch("/api/race/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, distance }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  },

  // 登録用レースリスト取得
  // @param token 認証トークン
  // @return Race[] 登録用レースリスト
  getRegistrableRaces: async (token: string): Promise<Race[]> => {
    const response = await fetch("/api/race/regist-list", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson.data || [];
  }
};