// 認証関連のビジネスロジック
export const authLogic = {
  /** ログイン成功時の処理
   * @param data ログインレスポンスデータ
   * @param onLogin ログイン成功コールバック
   * @return void
   */
  handleLoginSuccess: (data: any, onLogin: () => void): void => {
    alert(data.message);
    localStorage.setItem("auth_token", data.token);
    onLogin();
  },

  /** ログイン失敗時の処理
   * @param data ログインレスポンスデータ
   * @return void
   */
  handleLoginError: (data: any): void => {
    alert(data.message);
  },

  /** 入力値検証
   * @param userName ユーザー名
   * @param password パスワード
   * @return boolean 検証結果
   */
  validateLoginInput: (userName: string, password: string): boolean => {
    if (!userName || !password) {
      alert("ユーザーネームとパスワードを入力してください");
      return false;
    }
    return true;
  }
};