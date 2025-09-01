// 認証関連のAPI呼び出し
export const authApi = {
  /** ログイン処理
   * @param userName ユーザー名
   * @param password パスワード
   * @return any ログイン結果
   */
  login: async (userName: string, password: string): Promise<any> => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    return await response.json();
  }
};