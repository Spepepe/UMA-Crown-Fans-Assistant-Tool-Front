import { RegistUmamusume, Umamusume } from '../../components/interface/interface';

// キャラクター関連のAPI呼び出し
export const characterApi = {
  /** ユーザー登録済みウマ娘取得
   * @param token 認証トークン
   * @return RegistUmamusume[] 登録済みウマ娘リスト
   */
  getUserRegisteredCharacters: async (token: string): Promise<RegistUmamusume[]> => {
    const response = await fetch("/api/umamusume/user-regist", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  },

  /** ファン数更新
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param fans ファン数
   * @return void
   */
  updateFanCount: async (token: string, umamusumeId: number, fans: number): Promise<void> => {
    await fetch("/api/umamusume/fan-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ umamusumeId, fans }),
    });
  },

  /** 登録可能ウマ娘リスト取得
   * @param token 認証トークン
   * @return Umamusume[] 登録可能ウマ娘リスト
   */
  getRegistrableCharacters: async (token: string): Promise<Umamusume[]> => {
    const response = await fetch("/api/umamusume/regist-list", {
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
  },

  /** ウマ娘登録
   * @param token 認証トークン
   * @param umamusumeId ウマ娘ID
   * @param raceIdArray レースIDリスト
   * @param fans ファン数
   * @return any 登録結果
   */
  registerCharacter: async (token: string, umamusumeId:number, raceIdArray: number[], fans: number): Promise<any> => {
    const response = await fetch("/api/umamusume/regist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ umamusumeId, raceIdArray, fans }),
    });

    if (!response.ok) {
      throw new Error("ウマ娘のレース登録に失敗しました");
    }
    return await response.json();
  }
};