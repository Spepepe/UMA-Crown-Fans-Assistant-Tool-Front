import { acterApi } from '../api/acterApi';

// アクター関連のサービス関数
export const acterService = {
  /** アクター情報取得
   * @return any[] アクター情報
   */
  fetchActers: async (): Promise<any[]> => {
    try {
      return await acterApi.fetchActers();
    } catch (error) {
      console.error("Failed to fetch acters:", error);
      return [];
    }
  }
};