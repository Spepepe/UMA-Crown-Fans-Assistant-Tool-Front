import { jewelApi } from '../api/jewelApi';

// ジュエル関連のサービス関数
export const jewelService = {
  /** ジュエル登録処理
   * @param token 認証トークン
   * @param jewel ジュエル数
   * @return any 登録結果
   */
  registerJewel: async (token: string, jewel: number): Promise<any> => {
    return await jewelApi.registerJewel(token, jewel);
  },

  /** 現在の日時取得
   * @return {year: number, month: number} 現在の年月
   */
  getCurrentDate: (): { year: number, month: number } => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1
    };
  },

  /** 年の選択肢を生成
   * @return number[] 年の配列
   */
  getYearOptions: (): number[] => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 2021; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  }
};