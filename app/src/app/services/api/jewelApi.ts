// ジュエル関連のAPI呼び出し
export const jewelApi = {
  /** ジュエル登録処理
   * @param token 認証トークン
   * @param jewel ジュエル数
   * @return any 登録結果
   */
  registerJewel: async (token: string, jewel: number): Promise<any> => {
    const response = await fetch("/api/jewel/regist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jewel }),
    });

    if (!response.ok) {
      throw new Error("ジュエルの登録に失敗しました");
    }
    return await response.json();
  }
};