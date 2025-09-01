import { authApi, authLogic } from 'src';

/** 認証用カスタムフック
 * @param onLogin ログイン成功コールバック
 * @return 認証関連の状態と関数
 */
export const useAuth = (onLogin: () => void) => {
  /** ログイン処理
   * @param userName ユーザー名
   * @param password パスワード
   * @return void
   */
  const handleLogin = async (userName: string, password: string): Promise<void> => {
    if (!authLogic.validateLoginInput(userName, password)) {
      return;
    }

    try {
      const data = await authApi.login(userName, password);
      if (data.message === "ログイン成功") {
        authLogic.handleLoginSuccess(data, onLogin);
      } else {
        authLogic.handleLoginError(data);
      }
    } catch (error) {
      alert("ログインできませんでした。");
    }
  };

  /** 登録後ログイン処理
   * @param userName ユーザー名
   * @param password パスワード
   * @return void
   */
  const handleRegist = (userName: string, password: string): void => {
    handleLogin(userName, password);
  };

  return {
    handleLogin,
    handleRegist
  };
};